import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vehicleId = searchParams.get('vehicleId')
    const category = searchParams.get('category')

    const parts = await prisma.part.findMany({
      where: {
        AND: [
          vehicleId ? { vehicleId } : undefined,
          category ? { category } : undefined
        ].filter(Boolean)
      },
      orderBy: { createdAt: 'desc' },
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
        _count: {
          select: {
            maintenance: true
          }
        }
      }
    })
    return NextResponse.json(parts)
  } catch (error) {
    console.error('Error fetching parts:', error)
    return NextResponse.json({ error: 'Failed to fetch parts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const part = await prisma.part.create({
      data: {
        name: data.name,
        partNumber: data.partNumber || null,
        manufacturer: data.manufacturer || null,
        description: data.description || null,
        category: data.category || null,
        cost: data.cost ? parseFloat(data.cost) : null,
        quantity: data.quantity ? parseInt(data.quantity) : 1,
        minStock: data.minStock ? parseInt(data.minStock) : null,
        location: data.location || null,
        purchasedAt: data.purchasedAt ? new Date(data.purchasedAt) : null,
        vehicleId: data.vehicleId || null,
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
        }
      }
    })
    return NextResponse.json(part, { status: 201 })
  } catch (error) {
    console.error('Error creating part:', error)
    return NextResponse.json({ error: 'Failed to create part' }, { status: 500 })
  }
}