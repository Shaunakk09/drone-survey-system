'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import { MissionProvider } from '../context/MissionContext'

// Icons
const DashboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
)

const MissionsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
)


const AnalyticsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { href: '/missions', label: 'Missions', icon: MissionsIcon },
    { href: '/analytics', label: 'Analytics', icon: AnalyticsIcon },
  ]

  return (
    <MissionProvider>
      <div className="flex min-h-screen text-gray-100 bg-slate-900" style={{backgroundColor: '#000000'}}>
        {/* Sidebar */}
        <div>
          <aside
            className="fixed left-0 top-0 z-40 h-screen w-64"
            style={{ backgroundColor: '#1A1A1A' }}
          >
            <div className="flex h-full flex-col shadow-2xl">
              {/* Sidebar Header */}
              <div className="flex h-16 items-center px-4">
                <span className="text-xl font-semibold text-white whitespace-nowrap">Drone Survey</span>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1 p-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group flex items-center px-3 py-2 rounded-lg transition-all duration-300 ease-in-out',
                        isActive
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-white hover:bg-slate-700'
                      )}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>
        </div>

        {/* Main Content */}
        <main
          className="flex-1 ml-64 bg-black overflow-hidden"
        >
          <div>{children}</div>
        </main>
      </div>
    </MissionProvider>
  )
} 