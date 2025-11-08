// Temporary mock data to get the app running without Prisma issues

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  type: 'CAR' | 'MOTORCYCLE' | 'BOAT'
  vin?: string
  licensePlate?: string
  color?: string
  odometer?: number
  purchasedAt?: Date
  soldAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface MaintenanceRecord {
  id: string
  vehicleId: string
  type: string
  title: string
  description?: string
  date: Date
  odometer?: number
  cost?: number
  laborHours?: number
  shopId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Part {
  id: string
  name: string
  partNumber?: string
  manufacturer?: string
  description?: string
  category?: string
  cost?: number
  quantity: number
  minStock?: number
  location?: string
  purchasedAt?: Date
  vehicleId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Shop {
  id: string
  name: string
  address?: string
  phone?: string
  email?: string
  website?: string
  specialties?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Mock data
export const mockVehicles: (Vehicle & { _count: { maintenanceRecords: number, projects: number, parts: number } })[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'CBR600RR',
    year: 2022,
    type: 'MOTORCYCLE',
    color: 'Red',
    odometer: 3500,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { maintenanceRecords: 3, projects: 1, parts: 5 }
  },
  {
    id: '2', 
    make: 'Yamaha',
    model: '242 Limited S',
    year: 2021,
    type: 'BOAT',
    color: 'White/Blue',
    odometer: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { maintenanceRecords: 2, projects: 0, parts: 8 }
  }
]

export const mockMaintenanceRecords = [
  {
    id: '1',
    vehicleId: '1',
    type: 'OIL_CHANGE',
    title: 'Regular Oil Change',
    description: 'Synthetic oil replacement',
    date: new Date('2024-01-15'),
    odometer: 3000,
    cost: 75.00,
    laborHours: 0.5,
    shopId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicle: mockVehicles[0],
    shop: { id: '1', name: 'Honda Motorcycles', phone: '555-0123' } as Shop,
    _count: { notes: 0, documents: 1 }
  }
]

export const mockParts = [
  {
    id: '1',
    name: 'Oil Filter',
    partNumber: 'OF-001',
    manufacturer: 'K&N',
    category: 'Filters',
    cost: 12.99,
    quantity: 3,
    minStock: 1,
    location: 'Garage Shelf A',
    vehicleId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicle: null,
    _count: { maintenance: 1 }
  }
]

export const mockShops = [
  {
    id: '1',
    name: 'Honda Motorcycles',
    address: '123 Main St\\nAnytown, USA 12345',
    phone: '555-0123',
    email: 'service@hondamc.com',
    website: 'https://hondamc.com',
    specialties: 'Honda motorcycles, sport bikes',
    notes: 'Great service, fair prices',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { maintenanceRecords: 5 }
  }
]