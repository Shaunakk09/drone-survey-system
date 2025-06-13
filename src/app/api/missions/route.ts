import { NextResponse } from 'next/server'
import { mockMissions } from '@/app/lib/mockMissions'

export async function GET() {
  return NextResponse.json(mockMissions)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Mock response
  return NextResponse.json({
    id: Math.floor(Math.random() * 1000),
    ...body,
    status: 'scheduled',
  })
} 