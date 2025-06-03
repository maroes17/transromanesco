'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Truck,
  Users,
  Map,
  FileText,
  DollarSign,
  Wrench,
  Settings,
  BarChart,
  Shield,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from './layout/sidebar-context'

const mainNavigation = [
  { name: 'Dashboard', href: '/', icon: BarChart },
  { name: 'Flota', href: '/flota', icon: Truck },
  { name: 'Choferes', href: '/choferes', icon: Users },
  { name: 'Viajes', href: '/viajes', icon: Map },
  { name: 'Pólizas', href: '/polizas', icon: Shield },
  { name: 'Gastos', href: '/gastos', icon: DollarSign },
  { name: 'Mantenimiento', href: '/mantenimiento', icon: Wrench },
  { name: 'Documentos', href: '/documentos', icon: FileText },
  { name: 'Configuración', href: '/configuracion', icon: Settings },
]

const adminNavigation = [
  { name: 'Usuarios', href: '/usuarios', icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar()

  return (
    <>
      {/* Botón para mostrar/ocultar sidebar en móviles */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay para móviles */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'absolute left-0 top-0 h-full transform bg-white transition-all duration-300 ease-in-out',
          'border-r border-gray-200',
          isCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-900">TransRomanesco</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        <nav className="h-[calc(100vh-4rem)] overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {/* Navegación principal */}
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  )}
                >
                  <item.icon className={cn(
                    'h-5 w-5',
                    isCollapsed ? '' : 'mr-3',
                    isActive ? 'text-blue-700' : 'text-gray-400'
                  )} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}

            {/* Separador */}
            <div className="my-4 border-t border-gray-200" />

            {/* Navegación de administración */}
            {adminNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  )}
                >
                  <item.icon className={cn(
                    'h-5 w-5',
                    isCollapsed ? '' : 'mr-3',
                    isActive ? 'text-blue-700' : 'text-gray-400'
                  )} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
} 