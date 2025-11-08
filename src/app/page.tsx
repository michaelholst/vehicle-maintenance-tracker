'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  CubeIcon, 
  WrenchIcon, 
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalVehicles: number
  totalMaintenance: number
  totalParts: number
  totalShops: number
  totalSpent: number
  upcomingMaintenance: any[]
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    totalMaintenance: 0,
    totalParts: 0,
    totalShops: 0,
    totalSpent: 0,
    upcomingMaintenance: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [vehiclesRes, maintenanceRes, partsRes, shopsRes] = await Promise.all([
        fetch('/api/vehicles'),
        fetch('/api/maintenance'),
        fetch('/api/parts'),
        fetch('/api/shops')
      ])

      const vehicles = await vehiclesRes.json()
      const maintenance = await maintenanceRes.json()
      const parts = await partsRes.json()
      const shops = await shopsRes.json()

      const totalSpent = maintenance.reduce((sum: number, record: any) => 
        sum + (record.cost || 0), 0
      )

      const upcomingMaintenance = maintenance
        .filter((record: any) => new Date(record.date) > new Date())
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)

      setStats({
        totalVehicles: vehicles.length,
        totalMaintenance: maintenance.length,
        totalParts: parts.length,
        totalShops: shops.length,
        totalSpent,
        upcomingMaintenance
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Vehicle Maintenance Dashboard
      </h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <Link href="/vehicles" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <CubeIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVehicles}</p>
            </div>
          </div>
        </Link>

        <Link href="/maintenance" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <WrenchIcon className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Services</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMaintenance}</p>
            </div>
          </div>
        </Link>

        <Link href="/parts" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <CubeIcon className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Parts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalParts}</p>
            </div>
          </div>
        </Link>

        <Link href="/shops" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <BuildingStorefrontIcon className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Shops</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalShops}</p>
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CalendarIcon className="w-8 h-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingMaintenance.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Maintenance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Maintenance
          </h2>
          {stats.upcomingMaintenance.length > 0 ? (
            <div className="space-y-3">
              {stats.upcomingMaintenance.map((record: any) => (
                <div key={record.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{record.title}</p>
                    <p className="text-sm text-gray-600">
                      {record.vehicle.year} {record.vehicle.make} {record.vehicle.model}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    {record.cost && (
                      <p className="text-sm text-gray-600">${record.cost.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No upcoming maintenance scheduled</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/vehicles" 
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <CubeIcon className="w-6 h-6 text-blue-600 mr-3" />
              <span className="font-medium text-gray-700">Add Vehicle</span>
            </Link>
            
            <Link 
              href="/maintenance" 
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <WrenchIcon className="w-6 h-6 text-green-600 mr-3" />
              <span className="font-medium text-gray-700">Log Service</span>
            </Link>
            
            <Link 
              href="/parts" 
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <CubeIcon className="w-6 h-6 text-purple-600 mr-3" />
              <span className="font-medium text-gray-700">Add Parts</span>
            </Link>
            
            <Link 
              href="/shops" 
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
            >
              <BuildingStorefrontIcon className="w-6 h-6 text-orange-600 mr-3" />
              <span className="font-medium text-gray-700">Add Shop</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}