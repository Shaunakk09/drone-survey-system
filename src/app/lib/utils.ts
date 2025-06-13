import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to conditionally join Tailwind CSS classes.
 * It combines `clsx` for conditional class application and `tailwind-merge`
 * for intelligently merging Tailwind classes without conflicts.
 * @param {...ClassValue[]} inputs - An array of class values (strings, objects, or arrays).
 * @returns {string} The merged and optimized CSS class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns a specific color code based on the mission status.
 * This function helps in visually distinguishing missions by their current state on the UI.
 * @param {string} status - The status of the mission (e.g., 'completed', 'in-progress', 'failed', 'pending').
 * @returns {string} The hexadecimal color code corresponding to the given status. Defaults to gray-500 if status is not recognized.
 */
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return '#10B981' // green-500: Indicates a successful completion.
    case 'in-progress':
      return '#3B82F6' // blue-500: Indicates an ongoing mission.
    case 'failed':
      return '#EF4444' // red-500: Indicates a mission that encountered an error or failed.
    case 'pending':
      return '#F59E0B' // amber-500: Indicates a mission awaiting start or processing.
    default:
      return '#6B7280' // gray-500: Default color for unknown or unspecified statuses.
  }
}

/**
 * Determines the continent based on provided latitude and longitude coordinates.
 * This function provides a simplified geographical categorization.
 * @param {number} lat - Latitude of the location.
 * @param {number} lng - Longitude of the location.
 * @returns {string} The name of the continent (e.g., 'North America', 'Europe', 'Asia', 'Africa', 'South America', 'Australia', 'Antarctica') or 'Unknown'.
 */
export function getContinent(lat: number, lng: number): string {
  // Northern Hemisphere
  if (lat >= 0 && lat <= 90 && lng >= -180 && lng <= 180) {
    if (lat >= 60) return 'North America'; // High latitudes often imply North America (simplified)
    if (lat >= 0 && lat < 60) {
      if (lng >= -180 && lng < -30) return 'North America'; // West of -30 longitude
      if (lng >= -30 && lng < 60) return 'Europe'; // Between -30 and 60 longitude
      if (lng >= 60 && lng < 180) return 'Asia'; // East of 60 longitude
    }
  }
  // Southern Hemisphere
  if (lat < 0 && lat >= -90 && lng >= -180 && lng <= 180) {
    if (lat <= -60) return 'Antarctica'; // South of -60 latitude (simplified)
    if (lat < 0 && lat > -60) {
      if (lng >= -180 && lng < -30) return 'South America'; // West of -30 longitude
      if (lng >= -30 && lng < 60) return 'Africa'; // Between -30 and 60 longitude
      if (lng >= 60 && lng < 180) return 'Australia'; // East of 60 longitude (includes Oceania)
    }
  }
  return 'Unknown'; // Default for coordinates not falling into defined regions
} 