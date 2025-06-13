'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { mockMissions } from '../lib/mockMissions';
import { FlightConfig } from '../../types/FlightConfig';

/**
 * Defines the structure for a single Mission object.
 * @interface Mission
 * @property {string} id - Unique identifier for the mission.
 * @property {string} name - Name of the mission.
 * @property {string} status - Current status of the mission (e.g., 'pending', 'in-progress', 'completed', 'failed').
 * @property {string} [statusColor] - Optional CSS color string for the mission status display.
 * @property {string} startTime - ISO string representing the mission's scheduled start time.
 * @property {string} [endTime] - Optional ISO string representing the mission's completion or failure time.
 * @property {string} drone - Identifier or name of the drone assigned to the mission.
 * @property {number} latitude - Latitude coordinate of the mission's central point.
 * @property {number} longitude - Longitude coordinate of the mission's central point.
 * @property {string} [description] - Optional detailed description of the mission.
 * @property {string} [updatedAt] - Optional ISO string representing the last update timestamp.
 * @property {string} [createdAt] - Optional ISO string representing the creation timestamp.
 * @property {FlightConfig} [flightConfig] - Optional detailed flight configuration for the mission, including survey area and flight path.
 */
export interface Mission {
  id: string;
  name: string;
  status: string;
  statusColor?: string;
  startTime: string;
  endTime?: string;
  drone: string;
  latitude: number;
  longitude: number;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  flightConfig?: FlightConfig;
}

/**
 * Defines the shape of the Mission Context, providing mission data and functions to manipulate it.
 * @interface MissionContextType
 * @property {Mission[]} missions - An array of all missions.
 * @property {(missions: Mission[]) => void} setMissions - Function to update the entire missions array.
 * @property {(id: string) => Mission | undefined} getMission - Function to retrieve a single mission by its ID.
 * @property {(id: string, updatedFields: Partial<Mission>) => void} updateMission - Function to update specific fields of a mission.
 * @property {(mission: Mission) => void} addMission - Function to add a new mission to the list.
 */
interface MissionContextType {
  missions: Mission[];
  setMissions: (missions: Mission[]) => void;
  getMission: (id: string) => Mission | undefined;
  updateMission: (id: string, updatedFields: Partial<Mission>) => void;
  addMission: (mission: Mission) => void;
}

// Create the React Context for missions. It's initialized with `undefined` and will hold the context value.
const MissionContext = createContext<MissionContextType | undefined>(undefined);

/**
 * MissionProvider component wraps the application (or part of it) to provide mission data and functionalities.
 * It manages the `missions` state and exposes functions to interact with this state.
 * @param {object} props
 * @param {ReactNode} props.children - The child components that will have access to the mission context.
 */
export function MissionProvider({ children }: { children: ReactNode }) {
  // `useState` to manage the array of missions. It's initialized with `mockMissions`.
  const [missions, setMissions] = useState<Mission[]>(mockMissions);

  /**
   * Retrieves a mission from the `missions` array by its unique ID.
   * @param {string} id - The ID of the mission to retrieve.
   * @returns {Mission | undefined} The mission object if found, otherwise `undefined`.
   */
  const getMission = (id: string) => missions.find(mission => mission.id === id);

  /**
   * Updates a specific mission in the `missions` array.
   * It finds the mission by ID and merges the `updatedFields` into it.
   * @param {string} id - The ID of the mission to update.
   * @param {Partial<Mission>} updatedFields - An object containing the fields to update.
   */
  const updateMission = (id: string, updatedFields: Partial<Mission>) => {
    setMissions(prevMissions =>
      prevMissions.map(mission =>
        mission.id === id ? { ...mission, ...updatedFields } : mission
      )
    );
  };

  /**
   * Adds a new mission to the `missions` array.
   * @param {Mission} mission - The mission object to add.
   */
  const addMission = (mission: Mission) => {
    setMissions(prevMissions => [...prevMissions, mission]);
  };

  return (
    // The Provider component makes the missions data and functions available to its children.
    <MissionContext.Provider value={{ missions, setMissions, getMission, updateMission, addMission }}>
      {children}
    </MissionContext.Provider>
  );
}

/**
 * Custom hook to consume the MissionContext. This hook provides a convenient way to access
 * mission data and manipulation functions from any component within the MissionProvider's scope.
 * Throws an error if used outside of a MissionProvider to ensure correct usage.
 * @returns {MissionContextType} The mission context value.
 * @throws {Error} If `useMission` is not used within a `MissionProvider`.
 */
export function useMission() {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
} 