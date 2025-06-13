export interface FlightPathConfig {
  waypoints: Array<{ lat: number; lng: number; altitude: number }>;
  altitude: number;
  overlap: number;
} 