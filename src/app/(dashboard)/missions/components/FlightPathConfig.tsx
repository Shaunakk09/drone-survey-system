import { useState } from 'react';

interface FlightPathConfigProps {
  onConfigUpdate: (config: FlightConfig) => void;
}

export interface FlightConfig {
  surveyArea: {
    points: Array<{ lat: number; lng: number }>;
    type?: string;
  };
  flightPath: {
    altitude: number;
    waypoints: Array<{ lat: number; lng: number; altitude: number }>;
    overlap: number;
  };
  dataCollection: {
    frequency: number;
    sensors: string[];
    resolution: string;
  };
}

export default function FlightPathConfig({ onConfigUpdate }: FlightPathConfigProps) {
  const [config, setConfig] = useState<FlightConfig>({
    surveyArea: {
      points: [],
    },
    flightPath: {
      altitude: 50,
      waypoints: [],
      overlap: 70,
    },
    dataCollection: {
      frequency: 1,
      sensors: ['RGB', 'NDVI'],
      resolution: 'high',
    },
  });

  const handleConfigChange = (section: keyof FlightConfig, value: FlightConfig[keyof FlightConfig]) => {
    const newConfig = {
      ...config,
      [section]: value,
    };
    setConfig(newConfig);
    onConfigUpdate(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* Survey Area Configuration */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-2xl">
        <h3 className="text-xl font-semibold mb-4">Survey Area</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Area Type:</label>
            <select 
              className="bg-gray-700 rounded px-3 py-2"
              onChange={(e) => handleConfigChange('surveyArea', { ...config.surveyArea, type: e.target.value })}
            >
              <option value="polygon">Polygon</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </select>
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={() => {/* TODO: Implement area drawing on map */}}
          >
            Draw Area on Map
          </button>
        </div>
      </div>

      {/* Flight Path Configuration */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-2xl">
        <h3 className="text-xl font-semibold mb-4">Flight Path</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Altitude (m):</label>
            <input 
              type="number" 
              className="bg-gray-700 rounded px-3 py-2 w-24"
              value={config.flightPath.altitude}
              onChange={(e) => handleConfigChange('flightPath', { 
                ...config.flightPath, 
                altitude: Number(e.target.value) 
              })}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Image Overlap (%):</label>
            <input 
              type="number" 
              className="bg-gray-700 rounded px-3 py-2 w-24"
              value={config.flightPath.overlap}
              onChange={(e) => handleConfigChange('flightPath', { 
                ...config.flightPath, 
                overlap: Number(e.target.value) 
              })}
            />
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={() => {/* TODO: Implement waypoint drawing on map */}}
          >
            Add Waypoints
          </button>
        </div>
      </div>

      {/* Data Collection Configuration */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-2xl">
        <h3 className="text-xl font-semibold mb-4">Data Collection</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Capture Frequency (s):</label>
            <input 
              type="number" 
              className="bg-gray-700 rounded px-3 py-2 w-24"
              value={config.dataCollection.frequency}
              onChange={(e) => handleConfigChange('dataCollection', { 
                ...config.dataCollection, 
                frequency: Number(e.target.value) 
              })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Sensors:</label>
            <div className="flex gap-4">
              {['RGB', 'NDVI', 'Thermal', 'Multispectral'].map((sensor) => (
                <label key={sensor} className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    checked={config.dataCollection.sensors.includes(sensor)}
                    onChange={(e) => {
                      const newSensors = e.target.checked
                        ? [...config.dataCollection.sensors, sensor]
                        : config.dataCollection.sensors.filter(s => s !== sensor);
                      handleConfigChange('dataCollection', {
                        ...config.dataCollection,
                        sensors: newSensors,
                      });
                    }}
                  />
                  {sensor}
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Resolution:</label>
            <select 
              className="bg-gray-700 rounded px-3 py-2"
              value={config.dataCollection.resolution}
              onChange={(e) => handleConfigChange('dataCollection', { 
                ...config.dataCollection, 
                resolution: e.target.value 
              })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 