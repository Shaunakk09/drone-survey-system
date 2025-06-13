'use client';

import { useState, useEffect } from 'react';
import { MissionCard } from './components/MissionCard'
import NewMissionForm from './components/NewMissionForm'
import { useMission } from '../../context/MissionContext';
import { getStatusColor } from '../../lib/utils'

type FilterOption = 'all' | 'pending' | 'in-progress' | 'completed' | 'failed' | 'recent';

export default function MissionsPage() {
  const [showNewMissionForm, setShowNewMissionForm] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const { missions } = useMission();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterOptions: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'All Missions' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'recent', label: 'Recent' }
  ];

  // Sort missions by start time (most recent first)
  const sortedMissions = [...missions].sort((a, b) => {
    const dateA = new Date(a.startTime).getTime();
    const dateB = new Date(b.startTime).getTime();
    return dateB - dateA;
  });

  const filteredMissions = sortedMissions.filter(mission => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const missionDate = new Date(mission.startTime);
      
      // Debug log
      console.log('Mission:', mission.name);
      console.log('Mission Date:', missionDate);
      console.log('One Week Ago:', oneWeekAgo);
      console.log('Is Recent:', missionDate >= oneWeekAgo);
      
      return missionDate >= oneWeekAgo;
    }
    return mission.status === activeFilter;
  });

  // Debug log when filter changes
  useEffect(() => {
    console.log('Active Filter:', activeFilter);
    console.log('Total Missions:', missions.length);
    console.log('Filtered Missions:', filteredMissions.length);
  }, [activeFilter, missions, filteredMissions]);

  if (isLoading) {
    return <div className="text-white p-6">Loading missions...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-6">Error: {error}</div>;
  }

  return (
    <div className='m-16 mt-0'>
      <div className="bg-black rounded-lg shadow-lg">
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Missions</h1>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilterPopup(true)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filter
              </button>
              <button 
                onClick={() => setShowNewMissionForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Mission
              </button>
            </div>
          </div>
          <div className="m-4 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.length === 0 ? (
              <p className="text-gray-400">No missions found. Create a new one!</p>
            ) : (
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

      {showNewMissionForm && (
        <NewMissionForm onClose={() => setShowNewMissionForm(false)} />
      )}

      {showFilterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Filter Missions</h2>
              <button 
                onClick={() => setShowFilterPopup(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setActiveFilter(option.value);
                    setShowFilterPopup(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeFilter === option.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 