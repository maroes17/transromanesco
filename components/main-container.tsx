'use client'

import { ReactNode } from 'react'
import { useSidebar } from './layout/sidebar-context'
import { cn } from '@/lib/utils'

interface MainContainerProps {
  children: ReactNode
}

export function MainContainer({ children }: MainContainerProps) {
  const { isCollapsed } = useSidebar()

  return (
    <main
      className={cn(
        'flex-1 transition-all duration-300 ease-in-out',
        'min-h-screen bg-gray-50',
        isCollapsed ? 'md:ml-16' : 'md:ml-64'
      )}
    >
      <div className="h-full w-full p-4 md:p-6">
        {children}
      </div>
    </main>
  )
} 