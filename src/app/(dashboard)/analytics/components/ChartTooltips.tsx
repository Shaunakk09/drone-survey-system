import React from 'react';
import { TooltipProps as RechartsTooltipProps } from 'recharts';

/**
 * Props interface for custom tooltips in Recharts.
 * @interface TooltipProps
 * @property {boolean} [active] - Whether the tooltip is active/visible.
 * @property {Array<{ value: number; name: string; }>} [payload] - Data payload for the tooltip.
 * @property {string} [label] - The label for the data point.
 */
interface TooltipProps extends RechartsTooltipProps<any, any> {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
  }>;
  label?: string;
}

/**
 * Custom tooltip component for the Bar Chart.
 * Displays the label and value of the hovered bar.
 * @param {TooltipProps} props - Props provided by Recharts Tooltip component.
 * @returns {JSX.Element | null} The custom tooltip JSX or null if not active.
 */
export const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
        <p className="text-gray-200">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

/**
 * Custom tooltip component for the Pie Chart.
 * Displays the name and mission count for the hovered slice.
 * @param {TooltipProps} props - Props provided by Recharts Tooltip component.
 * @returns {JSX.Element | null} The custom tooltip JSX or null if not active.
 */
export const PieTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
        <p className="text-gray-200">{`${payload[0].name}: ${payload[0].value} missions`}</p>
      </div>
    );
  }
  return null;
}; 