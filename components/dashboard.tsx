'use client'

import { 
  Truck, 
  MapPin, 
  Wrench, 
  Users, 
  DollarSign,
  Shield
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const stats = [
  { name: 'Flota Activa', value: '12', icon: Truck, color: 'text-blue-600' },
  { name: 'Viajes en Curso', value: '8', icon: MapPin, color: 'text-green-600' },
  { name: 'Mantenimientos', value: '3', icon: Wrench, color: 'text-orange-600' },
  { name: 'Choferes Activos', value: '15', icon: Users, color: 'text-purple-600' },
  { name: 'Gastos del Mes', value: '$45,230', icon: DollarSign, color: 'text-emerald-600' },
  { name: 'Pólizas Activas', value: '24', icon: Shield, color: 'text-red-600' },
]

const monthlyData = [
  { name: 'Ene', viajes: 45, gastos: 35000 },
  { name: 'Feb', viajes: 52, gastos: 42000 },
  { name: 'Mar', viajes: 48, gastos: 38000 },
  { name: 'Abr', viajes: 55, gastos: 45000 },
  { name: 'May', viajes: 60, gastos: 48000 },
  { name: 'Jun', viajes: 65, gastos: 52000 },
]

const estadoFlota = [
  { name: 'En Ruta', value: 8, color: '#3B82F6' },
  { name: 'En Mantenimiento', value: 3, color: '#F59E0B' },
  { name: 'Disponible', value: 1, color: '#10B981' },
]

const COLORS = ['#3B82F6', '#F59E0B', '#10B981']

export function Dashboard() {
  return (
    <div className="h-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Bienvenido al sistema de gestión de transporte
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.color} bg-opacity-10`}>
                <stat.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className={`text-2xl font-semibold ${stat.color}`}>
                {stat.value}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfico de Viajes y Gastos */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Viajes y Gastos Mensuales</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="viajes"
                  stroke="#3B82F6"
                  fill="#93C5FD"
                  name="Viajes"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="gastos"
                  stroke="#10B981"
                  fill="#A7F3D0"
                  name="Gastos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Estado de la Flota */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Estado de la Flota</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estadoFlota}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {estadoFlota.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 