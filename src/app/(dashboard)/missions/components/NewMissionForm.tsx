import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMission } from '../../../context/MissionContext';
import { FlightConfig } from '../../../../types/FlightConfig';

// Dynamically import the map component to avoid SSR issues
const MissionMap = dynamic(() => import('../components/MissionMap'), { ssr: false });

interface NewMissionFormProps {
  onClose: () => void;
}

export default function NewMissionForm({ onClose }: NewMissionFormProps) {
  const router = useRouter();
  const { missions, setMissions } = useMission();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: 51.505,
    longitude: -0.09,
    startTime: '',
    drone: '',
  });
  const [flightConfig, setFlightConfig] = useState<FlightConfig>({
    surveyArea: {
      points: [],
      type: 'polygon'
    },
    flightPath: {
      altitude: 50,
      waypoints: [],
      overlap: 70
    },
    dataCollection: {
      frequency: 1,
      sensors: ['RGB'],
      resolution: 'high' as 'high' | 'medium' | 'low'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfigUpdate = (config: Partial<FlightConfig>) => {
    setFlightConfig(prevConfig => ({
      ...prevConfig,
      ...config,
      flightPath: {
        ...prevConfig.flightPath,
        ...config.flightPath,
        waypoints: config.flightPath?.waypoints || prevConfig.flightPath.waypoints,
        altitude: config.flightPath?.altitude || prevConfig.flightPath.altitude,
        overlap: config.flightPath?.overlap || prevConfig.flightPath.overlap
      },
      dataCollection: {
        ...prevConfig.dataCollection,
        ...config.dataCollection,
        sensors: config.dataCollection?.sensors || prevConfig.dataCollection.sensors,
        frequency: config.dataCollection?.frequency || prevConfig.dataCollection.frequency,
        resolution: config.dataCollection?.resolution || prevConfig.dataCollection.resolution
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a new mission object
      const newMission = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        latitude: formData.latitude,
        longitude: formData.longitude,
        startTime: formData.startTime,
        drone: formData.drone,
        flightConfig: flightConfig,
        status: 'pending' as const,
        statusColor: '#F59E0B', // amber-500 for pending
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add to context
      setMissions([...missions, newMission]);
      router.push(`/missions/${newMission.id}`);
      onClose();
    } catch (error) {
      console.error('Error creating mission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-y-0 left-[256px] right-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-5xl max-h-[calc(100vh-64px)] overflow-y-auto p-6">
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create New Mission</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Mission Information and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Mission Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mission name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter mission description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Select Drone
                  </label>
                  <select
                    name="drone"
                    value={formData.drone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a drone</option>
                    <option value="DRN-001">DRN-001</option>
                    <option value="DRN-002">DRN-002</option>
                  </select>
                </div>
              </div>

              {/* Mission Map */}
              <MissionMap
                missionId="new"
                latitude={formData.latitude}
                longitude={formData.longitude}
                flightConfig={flightConfig}
                onConfigUpdate={handleConfigUpdate}
                showMarker={false}
              />
            </div>

            {/* Flight Configuration */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Flight Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Altitude (m)
                  </label>
                  <input
                    type="number"
                    value={flightConfig?.flightPath?.altitude || 50}
                    onChange={(e) => handleConfigUpdate({
                      flightPath: {
                        ...flightConfig?.flightPath,
                        altitude: Number(e.target.value)
                      }
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    min="10"
                    max="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Image Overlap (%)
                  </label>
                  <input
                    type="number"
                    value={flightConfig?.flightPath?.overlap || 70}
                    onChange={(e) => handleConfigUpdate({
                      flightPath: {
                        ...flightConfig?.flightPath,
                        overlap: Number(e.target.value)
                      }
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Capture Frequency (s)
                  </label>
                  <input
                    type="number"
                    value={flightConfig?.dataCollection?.frequency || 1}
                    onChange={(e) => handleConfigUpdate({
                      dataCollection: {
                        ...flightConfig?.dataCollection,
                        frequency: Number(e.target.value)
                      }
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sensors
                </label>
                <div className="flex flex-wrap gap-4">
                  {['RGB', 'NDVI', 'Thermal', 'Multispectral'].map((sensor) => (
                    <label key={sensor} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={flightConfig?.dataCollection?.sensors?.includes(sensor) || false}
                        onChange={(e) => {
                          const currentSensors = flightConfig?.dataCollection?.sensors || [];
                          const newSensors = e.target.checked
                            ? [...currentSensors, sensor]
                            : currentSensors.filter(s => s !== sensor);
                          handleConfigUpdate({
                            dataCollection: {
                              ...flightConfig?.dataCollection,
                              sensors: newSensors
                            }
                          });
                        }}
                        className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-gray-300">{sensor}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Mission'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 