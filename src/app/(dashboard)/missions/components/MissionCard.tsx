import Link from 'next/link'

/**
 * Props for the MissionCard component.
 * @interface MissionCardProps
 * @param {string} id - The unique identifier of the mission.
 * @param {string} name - The name of the mission.
 * @param {string} status - The current status of the mission (e.g., 'pending', 'in-progress', 'completed', 'failed').
 * @param {string} statusColor - The CSS color string corresponding to the mission's status.
 * @param {string} startTime - The start timestamp of the mission in ISO format.
 * @param {string} [endTime] - Optional end timestamp of the mission in ISO format, present for 'completed' or 'failed' missions.
 * @param {string} drone - The name or identifier of the drone assigned to the mission.
 */
interface MissionCardProps {
  id: string;
  name: string;
  status: string;
  statusColor: string;
  startTime: string;
  endTime?: string;
  drone: string;
}

/**
 * MissionCard component displays a summary of a single drone mission.
 * It is a clickable card that links to the detailed view of the mission.
 * @param {MissionCardProps} props - The properties for the MissionCard component.
 */
export const MissionCard = ({
  id, name, status, statusColor, startTime, endTime, drone
}: MissionCardProps) => {
  return (
    // Link component from Next.js for client-side navigation to the mission detail page.
    <Link href={`/missions/${id}`} className="block">
      {/* Main card container with styling for background, shadow, padding, hover effects, and layout */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-900 transition-colors cursor-pointer w-full flex flex-col justify-between">
        {/* Top section of the card: mission name and status */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-white text-lg">{name}</h3>
            <p className="text-sm text-gray-400"><span className="font-semibold">Status:</span> <span className="font-bold" style={{ color: statusColor }}>{status}</span></p>
          </div>
        </div>
        {/* Middle section: drone information */}
        <div className="text-sm text-gray-300 overflow-hidden text-ellipsis mb-2 flex-grow">
          <p className="text-gray-400"><span className="font-bold">Drone:</span> {drone}</p>
        </div>
        {/* Bottom section: start and end times */}
        <div className="text-sm text-white-300">
          {/* Display start time, formatted to ISO string without milliseconds */}
          <p><span className="font-semibold">Start:</span> {new Date(startTime).toISOString().replace('T', ' ').slice(0, 19)}</p>
          {/* Conditionally display end time if status is 'completed' or 'failed' and endTime is provided */}
          {(status === 'completed' || status === 'failed') && endTime && (
            <p><span className="font-semibold">End:</span> {new Date(endTime).toISOString().replace('T', ' ').slice(0, 19)}</p>
          )}
        </div>
      </div>
    </Link>
  )
} 