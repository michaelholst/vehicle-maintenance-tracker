import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MaintenanceType } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vehicleId = searchParams.get('vehicleId')

    const maintenanceRecords = await prisma.maintenanceRecord.findMany({
      where: vehicleId ? { vehicleId } : undefined,
      orderBy: { date: 'desc' },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            type: true
          }
        },
        shop: true,
        parts: {
          include: {
            part: true
          }
        },
        _count: {
          select: {
            notes: true,
            documents: true
          }
        }
      }
    })
    return NextResponse.json(maintenanceRecords)
  } catch (error) {
    console.error('Error fetching maintenance records:', error)
    return NextResponse.json({ error: 'Failed to fetch maintenance records' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const maintenanceRecord = await prisma.maintenanceRecord.create({
      data: {
        vehicleId: data.vehicleId,
        type: data.type as MaintenanceType,
        title: data.title,
        description: data.description || null,
        date: new Date(data.date),
        odometer: data.odometer ? parseInt(data.odometer) : null,
        cost: data.cost ? parseFloat(data.cost) : null,
        laborHours: data.laborHours ? parseFloat(data.laborHours) : null,
        shopId: data.shopId || null,
      },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            type: true
          }
        },
        shop: true
      }
    })
    return NextResponse.json(maintenanceRecord, { status: 201 })
  } catch (error) {
    console.error('Error creating maintenance record:', error)
    return NextResponse.json({ error: 'Failed to create maintenance record' }, { status: 500 })
  }
}