import React from 'react';
import { FlightConfig } from '../../../../../types/FlightConfig';

interface FlightConfigInputsProps {
  flightConfig: FlightConfig;
  onConfigUpdate: (config: Partial<FlightConfig>) => void;
}

const FlightConfigInputs: React.FC<FlightConfigInputsProps> = ({
  flightConfig,
  onConfigUpdate,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Flight Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="altitude" className="block text-sm font-medium text-gray-300 mb-1">
            Altitude (m)
          </label>
          <input
            type="number"
            id="altitude"
            value={flightConfig?.flightPath?.altitude || 50}
            onChange={(e) => onConfigUpdate({
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
          <label htmlFor="overlap" className="block text-sm font-medium text-gray-300 mb-1">
            Image Overlap (%)
          </label>
          <input
            type="number"
            id="overlap"
            value={flightConfig?.flightPath?.overlap || 70}
            onChange={(e) => onConfigUpdate({
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
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-1">
            Capture Frequency (s)
          </label>
          <input
            type="number"
            id="frequency"
            value={flightConfig?.dataCollection?.frequency || 1}
            onChange={(e) => onConfigUpdate({
              dataCollection: {
                ...flightConfig?.dataCollection,
                frequency: Number(e.target.value)
              }
            })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            min="1"
            max="60"
          />
        </div>

        <div>
          <label htmlFor="sensors" className="block text-sm font-medium text-gray-300 mb-1">
            Sensors
          </label>
          <select
            id="sensors"
            value={flightConfig?.dataCollection?.sensors[0] || 'RGB'}
            onChange={(e) => onConfigUpdate({
              dataCollection: {
                ...flightConfig?.dataCollection,
                sensors: [e.target.value as 'RGB' | 'Multispectral']
              }
            })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="RGB">RGB</option>
            <option value="Multispectral">Multispectral</option>
          </select>
        </div>

        <div>
          <label htmlFor="resolution" className="block text-sm font-medium text-gray-300 mb-1">
            Resolution
          </label>
          <select
            id="resolution"
            value={flightConfig?.dataCollection?.resolution || 'high'}
            onChange={(e) => onConfigUpdate({
              dataCollection: {
                ...flightConfig?.dataCollection,
                resolution: e.target.value as 'high' | 'medium' | 'low'
              }
            })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FlightConfigInputs; 