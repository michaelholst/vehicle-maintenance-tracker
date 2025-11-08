import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { VehicleType } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        maintenanceRecords: {
          orderBy: { date: 'desc' }
        },
        parts: {
          orderBy: { createdAt: 'desc' }
        },
        projects: {
          orderBy: { createdAt: 'desc' }
        },
        notes: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return NextResponse.json({ error: 'Failed to fetch vehicle' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
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
    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error updating vehicle:', error)
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.vehicle.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Vehicle deleted successfully' })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 })
  }
}