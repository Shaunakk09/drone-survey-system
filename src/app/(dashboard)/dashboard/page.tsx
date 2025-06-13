'use client';
import dynamic from 'next/dynamic';
import { useMission } from '../../context/MissionContext';

/**
 * Dynamically imports the MissionGlobe component.
 * This is essential for components that rely on browser-specific APIs (like 3D globe libraries)
 * to prevent issues during server-side rendering in Next.js.
 * `ssr: false` ensures the component is only loaded on the client-side.
 */
const MissionGlobe = dynamic(() => import('./components/MissionGlobe'), { ssr: false });

/**
 * DashboardPage component displays an overview of drone mission statistics and a global visualization of mission locations.
 * It fetches mission data from the `MissionContext` to calculate and display key metrics.
 */
export default function DashboardPage() {
  // Access the missions array from the global MissionContext.
  const { missions } = useMission();

  // Calculate key performance indicators (KPIs) based on the missions data.
  // Counts missions with 'in-progress' status.
  const activeMissions = missions.filter(m => m.status === 'in-progress').length;
  // Counts unique drones involved in 'in-progress' missions.
  const activeDrones = new Set(missions.filter(m => m.status === 'in-progress').map(m => m.drone)).size;
  // Total number of all recorded flights/missions.
  const totalFlights = missions.length;

  return (
    // Main container for the dashboard content, with margin, spacing, and full width.
    <div className="m-4 space-y-6 w-full">
    
      {/* Stats Cards Section: Displays key metrics in a grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card for Active Missions */}
        <div className="p-4 sm:p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <h2 className="font-semibold mb-2 text-gray-300">Active Missions</h2>
          <p className="text-2xl sm:text-3xl font-bold text-blue-400">{activeMissions}</p>
        </div>
        {/* Card for Active Drones */}
        <div className="p-4 sm:p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <h2 className="font-semibold mb-2 text-gray-300">Active Drones</h2>
          <p className="text-2xl sm:text-3xl font-bold text-green-400">{activeDrones}</p>
        </div>
        {/* Card for Total Flights */}
        <div className="p-4 sm:p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <h2 className="font-semibold mb-2 text-gray-300">Total Flights</h2>
          <p className="text-2xl sm:text-3xl font-bold text-purple-400">{totalFlights}</p>
        </div>
      </div>

      {/* Globe Section: Displays the MissionGlobe component for visualizing mission locations */}
      <div className="w-full">
        <h2 className="mb-4 text-xl font-semibold text-white">Mission Locations</h2>
        {/* Container for the globe, with transition effects for potential resizing or animations */}
        <div className="transition-all duration-500 ease-in-out transform">
          <MissionGlobe />
        </div>
      </div>
    </div>
  );
} 