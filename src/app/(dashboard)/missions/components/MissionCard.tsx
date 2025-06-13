import Link from 'next/link'

interface MissionCardProps {
  id: string;
  name: string;
  status: string;
  statusColor: string;
  startTime: string;
  endTime?: string;
  drone: string;
}

export const MissionCard = ({
  id, name, status, statusColor, startTime, endTime, drone
}: MissionCardProps) => {
  return (
    <Link href={`/missions/${id}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-900 transition-colors cursor-pointer w-full flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-white text-lg">{name}</h3>
            <p className="text-sm text-gray-400"><span className="font-semibold">Status:</span> <span className="font-bold" style={{ color: statusColor }}>{status}</span></p>
          </div>
        </div>
        <div className="text-sm text-gray-300 overflow-hidden text-ellipsis mb-2 flex-grow">
          <p className="text-gray-400"><span className="font-bold">Drone:</span> {drone}</p>
        </div>
        <div className="text-sm text-white-300">
          <p><span className="font-semibold">Start:</span> {new Date(startTime).toISOString().replace('T', ' ').slice(0, 19)}</p>
          {(status === 'completed' || status === 'failed') && endTime && (
            <p><span className="font-semibold">End:</span> {new Date(endTime).toISOString().replace('T', ' ').slice(0, 19)}</p>
          )}
        </div>
      </div>
    </Link>
  )
} 