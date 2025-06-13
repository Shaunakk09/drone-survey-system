'use client';
import dynamic from 'next/dynamic';
import { useMission } from '../../context/MissionContext';

// Dynamically import the globe component to avoid SSR issues
const MissionGlobe = dynamic(() => import('./components/MissionGlobe'), { ssr: false });

export default function DashboardPage() {
  const { missions } = useMission();

  // Calculate stats
  const activeMissions = missions.filter(m => m.status === 'in-progress').length;
  const activeDrones = new Set(missions.filter(m => m.status === 'in-progress').map(m => m.drone)).size;
  const totalFlights = missions.length;

  return (
    <div className="m-4 space-y-6 w-full">
    
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <h2 className="font-semibold mb-2 text-gray-300">Active Missions</h2>
          <p className="text-2xl sm:text-3xl font-bold text-blue-400">{activeMissions}</p>
        </div>
        <div className="p-4 sm:p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <h2 className="font-semibold mb-2 text-gray-300">Active Drones</h2>
          <p className="text-2xl sm:text-3xl font-bold text-green-400">{activeDrones}</p>
        </div>
        <div className="p-4 sm:p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <h2 className="font-semibold mb-2 text-gray-300">Total Flights</h2>
          <p className="text-2xl sm:text-3xl font-bold text-purple-400">{totalFlights}</p>
        </div>
      </div>

      {/* Globe Section */}
      <div className="w-full">
        <h2 className="mb-4 text-xl font-semibold text-white">Mission Locations</h2>
        <div className="transition-all duration-500 ease-in-out transform">
          <MissionGlobe />
        </div>
      </div>
    </div>
  );
} 