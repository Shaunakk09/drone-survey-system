import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return '#10B981' // green-500
    case 'in-progress':
      return '#3B82F6' // blue-500
    case 'failed':
      return '#EF4444' // red-500
    case 'pending':
      return '#F59E0B' // amber-500
    default:
      return '#6B7280' // gray-500
  }
} 