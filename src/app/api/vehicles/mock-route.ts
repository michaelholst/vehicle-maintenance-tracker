import { NextResponse } from 'next/server'
import { mockVehicles } from '@/lib/mock-data'

export async function GET() {
  return NextResponse.json(mockVehicles)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newVehicle = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { maintenanceRecords: 0, projects: 0, parts: 0 }
  }
  mockVehicles.push(newVehicle)
  return NextResponse.json(newVehicle, { status: 201 })
}