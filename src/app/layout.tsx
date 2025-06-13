import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drone Survey System',
  description: 'A system for managing drone survey missions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 