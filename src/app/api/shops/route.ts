import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const shops = await prisma.shop.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            maintenanceRecords: true
          }
        }
      }
    })
    return NextResponse.json(shops)
  } catch (error) {
    console.error('Error fetching shops:', error)
    return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const shop = await prisma.shop.create({
      data: {
        name: data.name,
        address: data.address || null,
        phone: data.phone || null,
        email: data.email || null,
        website: data.website || null,
        specialties: data.specialties || null,
        notes: data.notes || null,
      }
    })
    return NextResponse.json(shop, { status: 201 })
  } catch (error) {
    console.error('Error creating shop:', error)
    return NextResponse.json({ error: 'Failed to create shop' }, { status: 500 })
  }
}