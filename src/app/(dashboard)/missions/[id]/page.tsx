/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useMission, Mission } from '../../../context/MissionContext';
import dynamic from 'next/dynamic';
import { FlightConfig } from '../../../../types/FlightConfig';

const MissionMap = dynamic(() => import('../components/MissionMap'), { ssr: false });

interface MissionDetailPageProps {
  params: { id: string };
}

export default function MissionDetailPage({ params }: MissionDetailPageProps) {
  const { id } = params;
  const { getMission, updateMission, addMission } = useMission();
  const [missionDetails, setMissionDetails] = useState<Mission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isEditable = missionDetails && !['completed', 'failed'].includes(missionDetails.status);

  useEffect(() => {
    const fetchMission = async () => {
      setIsLoading(true);
      setError(null);
      const fetchedMission: Mission | undefined = getMission(id);

      if (fetchedMission) {
        setMissionDetails(fetchedMission);
        setIsLoading(false);
      } else {
        try {
          const response = await fetch(`/api/missions/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch mission details');
          }
          const data: Mission = await response.json();
          // Ensure ID is string if it's coming as number from API
          const missionWithStrId = { ...data, id: String(data.id) };
          setMissionDetails(missionWithStrId);
          addMission(missionWithStrId); // Add to context if fetched from API
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred while fetching mission details');
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMission();
  }, [id, getMission, addMission]);

  const handleConfigUpdate = (config: Partial<FlightConfig>) => {
    if (!missionDetails) return;
    const updatedFlightConfig = {
      ...missionDetails.flightConfig,
      ...config,
      flightPath: { 
        ...missionDetails.flightConfig.flightPath, 
        ...(config.flightPath || {}),
        waypoints: config.flightPath?.waypoints || missionDetails.flightConfig.flightPath.waypoints 
      },
      dataCollection: { 
        ...missionDetails.flightConfig.dataCollection, 
        ...(config.dataCollection || {}) 
      },
    };
    setMissionDetails(prev => prev ? { ...prev, flightConfig: updatedFlightConfig } : null);
    updateMission(id, { flightConfig: updatedFlightConfig });
    console.log('Updated flight configuration:', config);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!missionDetails || !isEditable) return;
    setMissionDetails(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
    updateMission(id, { [e.target.name]: e.target.value });
  };

  const handleSensorChange = (sensor: string) => {
    if (!missionDetails || !isEditable) return;
    const currentSensors = missionDetails.flightConfig.dataCollection.sensors || [];
    const newSensors = currentSensors.includes(sensor)
      ? currentSensors.filter(s => s !== sensor)
      : [...currentSensors, sensor];

    handleConfigUpdate({
      dataCollection: {
        ...missionDetails.flightConfig.dataCollection,
        sensors: newSensors,
      }
    });
  };

  if (isLoading) {
    return <div className="text-white p-6">Loading mission details...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-6">Error: {error}</div>;
  }

  if (!missionDetails) {
    return <div className="text-white p-6">Mission not found.</div>;
  }

  return (
    <div className="p-2 text-white">      
      <div className="flex gap-4">
        {/* Mission Map - Left Side */}
        <div className="w-3/5 h-[600px]" style={{ display: 'flex', flexDirection: 'column'}}>
        <h1 className="text-2xl font-bold mb-4">{missionDetails.name}</h1>
          <MissionMap 
            missionId={id} 
            latitude={missionDetails.latitude} 
            longitude={missionDetails.longitude}
            flightConfig={missionDetails.flightConfig}
            onConfigUpdate={handleConfigUpdate}
            className="h-[600px]"
          />
          {/* New section for Mission ID, Dates below map */}
          <div className="w-full rounded-lg shadow-2xl p-6 bg-gray-800/50 backdrop-blur-sm mt-6 space-y-2">
            <p className="text-sm"><span className="font-semibold">Mission ID:</span> {missionDetails.id}</p>
            <p className="text-sm "><span className="font-semibold">Status:</span> {missionDetails.status}</p>
            <p className="text-sm"><span className="font-semibold">Date Created:</span> {missionDetails.createdAt}</p>
            <p className="text-sm"><span className="font-semibold">Last Updated:</span> {missionDetails.updatedAt}</p>
          </div>
        </div>
        {/* Combined Details and Configuration - Right Side */}
        <div className="w-2/5 space-y-4">
          <div className="rounded-lg shadow-2xl p-6 bg-gray-800/50 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4">Mission Details</h2>
            
            <div>
              <label htmlFor="missionName" className="block text-sm font-semibold mb-1">Mission Name:</label>
              <input
                type="text"
                id="missionName"
                name="name"
                value={missionDetails.name}
                onChange={handleDetailsChange}
                disabled={!isEditable}
                className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label htmlFor="missionDescription" className="block text-sm font-semibold mb-1">Description:</label>
              <textarea
                id="missionDescription"
                name="description"
                value={missionDetails.description}
                onChange={handleDetailsChange}
                disabled={!isEditable}
                rows={4}
                className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
              ></textarea>
            </div>
            

            <h2 className="text-lg font-semibold mb-4">Flight Path Configuration</h2>
            
            <div className="space-y-2">
              {/* Altitude Control */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Altitude (m)
                </label>
                <input
                  type="number"
                  value={missionDetails.flightConfig.flightPath.altitude}
                  onChange={(e) => handleConfigUpdate({
                    flightPath: { ...missionDetails.flightConfig.flightPath, altitude: Number(e.target.value) }
                  })}
                  disabled={!isEditable}
                  className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  min="10"
                  max="120"
                />
              </div>

              {/* Overlap Control */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image Overlap (%)
                </label>
                <input
                  type="number"
                  value={missionDetails.flightConfig.flightPath.overlap}
                  onChange={(e) => handleConfigUpdate({
                    flightPath: { ...missionDetails.flightConfig.flightPath, overlap: Number(e.target.value) }
                  })}
                  disabled={!isEditable}
                  className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  min="0"
                  max="100"
                />
              </div>

              {/* Capture Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Capture Frequency (s)
                </label>
                <input
                  type="number"
                  value={missionDetails.flightConfig.dataCollection.frequency}
                  onChange={(e) => handleConfigUpdate({
                    dataCollection: { ...missionDetails.flightConfig.dataCollection, frequency: Number(e.target.value) }
                  })}
                  disabled={!isEditable}
                  className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  min="1"
                  max="10"
                />
              </div>

              {/* Resolution Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image Resolution
                </label>
                <select
                  value={missionDetails.flightConfig.dataCollection.resolution}
                  onChange={(e) => handleConfigUpdate({
                    dataCollection: { ...missionDetails.flightConfig.dataCollection, resolution: e.target.value as 'low' | 'medium' | 'high' }
                  })}
                  disabled={!isEditable}
                  className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Sensor Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sensors
                </label>
                <div className="flex flex-wrap gap-4">
                  {['RGB', 'NDVI', 'Thermal', 'Multispectral'].map((sensor) => (
                    <label key={sensor} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={missionDetails.flightConfig.dataCollection.sensors?.includes(sensor) || false}
                        onChange={() => handleSensorChange(sensor)}
                        disabled={!isEditable}
                        className={`rounded border-gray-600 text-blue-500 focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      <span className="text-sm text-gray-300">{sensor}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 