import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMission } from '../../../context/MissionContext';
import { FlightConfig } from '../../../../types/FlightConfig';
import FlightConfigInputs from '../[id]/components/FlightConfigInputs';

// Dynamically import the map component to avoid SSR issues
const MissionMap = dynamic(() => import('../components/MissionMap'), { ssr: false });

/**
 * Props for the NewMissionForm component.
 * @interface NewMissionFormProps
 * @param {() => void} onClose - Callback function to close the new mission form modal.
 */
interface NewMissionFormProps {
  onClose: () => void;
}

/**
 * NewMissionForm component provides a form for users to create new drone survey missions.
 * It includes fields for mission details and an interactive map for configuring flight paths and survey areas.
 * Data is managed locally using React's `useState` and then added to the global mission context upon submission.
 */
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

  /**
   * Handles changes for basic form input fields (text, textarea, select).
   * Updates the `formData` state dynamically based on input `name` and `value`.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - The change event object.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles updates to the flight configuration. This function is passed to the MissionMap component
   * to receive updates on drawn or edited shapes (survey area, flight path) and other configuration changes.
   * It merges new configuration parts with the existing `flightConfig` state.
   * @param {Partial<FlightConfig>} config - Partial FlightConfig object with updated properties.
   */
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

  /**
   * Handles the form submission event.
   * Prevents default form submission, sets loading state, creates a new mission object,
   * adds it to the global mission context, navigates to the new mission's detail page,
   * and then closes the form.
   * @param {React.FormEvent} e - The form submission event object.
   */
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
              aria-label="Close form"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Mission Information and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Mission Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mission name"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter mission description"
                  />
                </div>

                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                <div>
                  <label htmlFor="drone" className="block text-sm font-medium text-gray-300 mb-1">
                    Select Drone
                  </label>
                  <select
                    id="drone"
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

            {/* Section for Flight Configuration Inputs */}
            <FlightConfigInputs 
              flightConfig={flightConfig}
              onConfigUpdate={handleConfigUpdate}
            />

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