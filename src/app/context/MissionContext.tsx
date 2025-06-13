'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { mockMissions } from '../lib/mockMissions';

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
  flightConfig?: any;
}

interface MissionContextType {
  missions: Mission[];
  setMissions: (missions: Mission[]) => void;
  getMission: (id: string) => Mission | undefined;
  updateMission: (id: string, updatedFields: Partial<Mission>) => void;
  addMission: (mission: Mission) => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>(mockMissions);

  const getMission = (id: string) => missions.find(mission => mission.id === id);

  const updateMission = (id: string, updatedFields: Partial<Mission>) => {
    setMissions(prevMissions =>
      prevMissions.map(mission =>
        mission.id === id ? { ...mission, ...updatedFields } : mission
      )
    );
  };

  const addMission = (mission: Mission) => {
    setMissions(prevMissions => [...prevMissions, mission]);
  };

  return (
    <MissionContext.Provider value={{ missions, setMissions, getMission, updateMission, addMission }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
} 