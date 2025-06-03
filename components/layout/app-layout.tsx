'use client'

import { ReactNode } from 'react'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { SidebarProvider } from './sidebar-context'
import { useSidebar } from './sidebar-context'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  children: ReactNode
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <div className={cn(
          'transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-16' : 'w-64',
          'hidden md:block'
        )} />
        <main className="flex-1 transition-all duration-300 ease-in-out">
          <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="relative">
        <Sidebar />
        <LayoutContent>
          {children}
        </LayoutContent>
      </div>
    </SidebarProvider>
  )
} 