'use client';

import { useState, useEffect } from 'react';
import { MissionCard } from './components/MissionCard'
import NewMissionForm from './components/NewMissionForm'
import { useMission } from '../../context/MissionContext';
import { getStatusColor } from '../../lib/utils'
import FilterPopup from './components/FilterPopup';

/**
 * Defines the possible filter options for displaying missions.
 * - 'all': Show all missions.
 * - 'pending': Show missions with 'pending' status.
 * - 'in-progress': Show missions with 'in-progress' status.
 * - 'completed': Show missions with 'completed' status.
 * - 'failed': Show missions with 'failed' status.
 * - 'recent': Show missions that started within the last 7 days.
 */
type FilterOption = 'all' | 'pending' | 'in-progress' | 'completed' | 'failed' | 'recent';

/**
 * MissionsPage component displays a list of drone missions, provides filtering capabilities,
 * and allows users to initiate the creation of new missions.
 * It fetches mission data from the MissionContext and manages UI states for forms and popups.
 */
export default function MissionsPage() {
  // State to control the visibility of the New Mission Form modal.
  const [showNewMissionForm, setShowNewMissionForm] = useState(false);
  // State to control the visibility of the Filter Missions popup.
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  // State to hold the currently active filter for missions.
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  // Access mission data and related functions from the MissionContext.
  const { missions } = useMission();
  // State to indicate if mission data is currently being loaded (placeholder for API integration).
  const [isLoading, setIsLoading] = useState(false);
  // State to store any error messages during data fetching (placeholder).
  const [error, setError] = useState<string | null>(null);

  // Array defining the available filter options for the missions list.
  // Each option has a 'value' (matching FilterOption type) and a user-friendly 'label'.
  const filterOptions: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'All Missions' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'recent', label: 'Recent' }
  ];

  // Sort missions by their start time in descending order (most recent first).
  // A shallow copy is made with [...missions] to avoid mutating the original missions array.
  const sortedMissions = [...missions].sort((a, b) => {
    const dateA = new Date(a.startTime).getTime();
    const dateB = new Date(b.startTime).getTime();
    return dateB - dateA; // Sorts from newest to oldest
  });

  // Filter the sorted missions based on the currently active filter.
  const filteredMissions = sortedMissions.filter(mission => {
    if (activeFilter === 'all') return true; // If 'all' is selected, show all missions.
    
    // Special handling for the 'recent' filter.
    if (activeFilter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Calculate the date 7 days ago.
      const missionDate = new Date(mission.startTime);
      
      // console.log('Mission:', mission.name); // Debug log
      // console.log('Mission Date:', missionDate); // Debug log
      // console.log('One Week Ago:', oneWeekAgo); // Debug log
      // console.log('Is Recent:', missionDate >= oneWeekAgo); // Debug log
      
      return missionDate >= oneWeekAgo; // Only show missions that started within the last week.
    }
    // For other filters (pending, in-progress, completed, failed), match by status.
    return mission.status === activeFilter;
  });

  // useEffect hook to log changes in active filter or mission data for debugging purposes.
  useEffect(() => {
    // console.log('Active Filter:', activeFilter); // Debug log
    // console.log('Total Missions:', missions.length); // Debug log
    // console.log('Filtered Missions:', filteredMissions.length); // Debug log
  }, [activeFilter, missions, filteredMissions]);

  // Conditional rendering for loading state.
  if (isLoading) {
    return <div className="text-white p-6">Loading missions...</div>;
  }

  // Conditional rendering for error state.
  if (error) {
    return <div className="text-red-500 p-6">Error: {error}</div>;
  }

  return (
    <div className='m-16 mt-0'>
      {/* Main container for the missions page, with styling for margin and background */}
      <div className="bg-black rounded-lg shadow-lg">
        {/* Flex container to structure header and mission list */}
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          {/* Header section with title and action buttons */}
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Missions</h1>
            {/* Container for filter and new mission buttons */}
            <div className="flex gap-2">
              {/* Filter button: opens the filter options popup */}
              <button 
                onClick={() => setShowFilterPopup(true)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                {/* Filter icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filter
              </button>
              {/* New Mission button: opens the New Mission form */}
              <button 
                onClick={() => setShowNewMissionForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Mission
              </button>
            </div>
          </div>
          {/* Mission cards grid: displays filtered missions or a message if none are found */}
          <div className="m-4 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.length === 0 ? (
              <p className="text-gray-400">No missions found. Create a new one!</p>
            ) : (
              // Map through filtered missions and render a MissionCard for each.
              filteredMissions.map((mission) => (
                <div key={mission.id} style={{ flex: 1 }}>
                  <MissionCard
                    key={mission.id}
                    id={mission.id}
                    name={mission.name}
                    status={mission.status}
                    statusColor={getStatusColor(mission.status)}
                    startTime={mission.startTime}
                    endTime={mission.updatedAt}
                    drone={mission.drone}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* New Mission Form Modal: Conditionally rendered when showNewMissionForm is true */}
      {showNewMissionForm && (
        <NewMissionForm onClose={() => setShowNewMissionForm(false)} />
      )}

      {/* Filter Missions Popup Modal: Uses the new FilterPopup component */}
      <FilterPopup
        show={showFilterPopup}
        onClose={() => setShowFilterPopup(false)}
        onSelectFilter={(filter) => {
          setActiveFilter(filter);
          setShowFilterPopup(false);
        }}
        activeFilter={activeFilter}
      />
    </div>
  )
} 