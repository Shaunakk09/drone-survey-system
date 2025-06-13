import { FlightPathConfig } from './FlightPathConfig';

export interface FlightConfig {
  surveyArea?: {
    points: Array<{ lat: number; lng: number }>;
    type: 'polygon';
  };
  flightPath?: FlightPathConfig;
  dataCollection: {
    frequency: number;
    resolution: 'low' | 'medium' | 'high';
    sensors?: string[];
  };
} 