import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { VehicleType } from '@prisma/client'

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            maintenanceRecords: true,
            projects: true,
            parts: true
          }
        }
      }
    })
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const vehicle = await prisma.vehicle.create({
      data: {
        make: data.make,
        model: data.model,
        year: data.year,
        type: data.type as VehicleType,
        vin: data.vin || null,
        licensePlate: data.licensePlate || null,
        color: data.color || null,
        odometer: data.odometer ? parseInt(data.odometer) : null,
        purchasedAt: data.purchasedAt ? new Date(data.purchasedAt) : null,
        soldAt: data.soldAt ? new Date(data.soldAt) : null,
      }
    })
    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 })
  }
}