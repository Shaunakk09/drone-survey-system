'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import { MissionProvider } from '../context/MissionContext'

// Icon components for navigation. Extracted for modularity and reusability.
/**
 * Renders a dashboard icon.
 * @param {React.SVGProps<SVGSVGElement>} props - SVG properties to apply to the icon.
 */
const DashboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
)

/**
 * Renders a missions icon.
 * @param {React.SVGProps<SVGSVGElement>} props - SVG properties to apply to the icon.
 */
const MissionsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
)

/**
 * Renders an analytics icon.
 * @param {React.SVGProps<SVGSVGElement>} props - SVG properties to apply to the icon.
 */
const AnalyticsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

/**
 * DashboardLayout component provides a consistent layout for all dashboard-related pages.
 * It includes a fixed sidebar navigation and a main content area.
 * It also wraps the content with `MissionProvider` to make mission data globally available.
 * @param {object} props
 * @param {React.ReactNode} props.children - The child components (pages) to be rendered within the layout.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() // Hook to get the current URL pathname

  // Defines the navigation items for the sidebar.
  // Each item includes its href, display label, and a corresponding icon component.
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { href: '/missions', label: 'Missions', icon: MissionsIcon },
    { href: '/analytics', label: 'Analytics', icon: AnalyticsIcon },
  ]

  return (
    // MissionProvider wraps the entire layout to provide mission context to all nested components.
    <MissionProvider>
      {/* Main container for the dashboard layout, setting min-height, text color, and background */}
      <div className="flex min-h-screen text-gray-100 bg-slate-900" style={{backgroundColor: '#000000'}}>
        {/* Sidebar container */}
        <div>
          {/* Fixed sidebar positioning and styling */}
          <aside
            className="fixed left-0 top-0 z-40 h-screen w-64"
            style={{ backgroundColor: '#1A1A1A' }} // Dark background for the sidebar
          >
            <div className="flex h-full flex-col shadow-2xl">
              {/* Sidebar Header: Displays the application title */}
              <div className="flex h-16 items-center px-4">
                <span className="text-xl font-semibold text-white whitespace-nowrap">Drone Survey</span>
              </div>

              {/* Navigation section */}
              <nav className="flex-1 space-y-1 p-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href // Check if the current nav item is active
                  return (
                    // Link component for navigation, with dynamic styling based on active state.
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group flex items-center px-3 py-2 rounded-lg transition-all duration-300 ease-in-out',
                        isActive
                          ? 'bg-blue-600 text-white shadow-md' // Active link styles
                          : 'text-white hover:bg-slate-700' // Inactive link styles
                      )}
                    >
                      {/* Render the icon component for the navigation item */}
                      <item.icon className="w-5 h-5 text-white" />
                      {/* Navigation item label */}
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>
        </div>

        {/* Main content area: takes up remaining space and handles overflow */}
        <main
          className="flex-1 ml-64 bg-black overflow-hidden" // Margin-left to account for sidebar width
        >
          {/* Renders the child pages/components */}
          <div>{children}</div>
        </main>
      </div>
    </MissionProvider>
  )
} 