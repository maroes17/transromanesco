'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar } from '@/contexts/sidebar-context'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Truck, 
  MapPin, 
  Bell, 
  ChevronRight, 
  ChevronLeft,
  Menu,
  X
} from 'lucide-react'

const mainRoutes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500'
  },
  {
    label: 'Vehículos',
    icon: Truck,
    href: '/vehiculos',
    color: 'text-orange-700'
  },
  {
    label: 'Geocercas',
    icon: MapPin,
    href: '/geocercas',
    color: 'text-emerald-500'
  },
  {
    label: 'Notificaciones',
    icon: Bell,
    href: '/notificaciones',
    color: 'text-yellow-500'
  }
]

const bottomRoutes = [
  {
    label: 'Usuarios',
    icon: Users,
    href: '/usuarios',
    color: 'text-violet-500'
  },
  {
    label: 'Configuración',
    icon: Settings,
    href: '/configuracion',
    color: 'text-pink-700'
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-background border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold">TransRomanesco</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <ChevronRight className="h-6 w-6" />
            ) : (
              <ChevronLeft className="h-6 w-6" />
            )}
          </Button>
        </div>

        <div className="flex flex-col flex-1">
          <ScrollArea className="flex-1 py-4">
            <div className="space-y-1 px-2">
              {mainRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-x-2 text-sm font-medium p-2 rounded-lg transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  {!isCollapsed && <span>{route.label}</span>}
                </Link>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-auto border-t py-4">
            <div className="space-y-1 px-2">
              {bottomRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-x-2 text-sm font-medium p-2 rounded-lg transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  {!isCollapsed && <span>{route.label}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
} 