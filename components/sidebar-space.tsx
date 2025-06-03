'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function SidebarSpace() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('aside')
      if (sidebar) {
        setIsCollapsed(sidebar.classList.contains('w-16'))
      }
    }

    // Observar cambios en el sidebar
    const observer = new MutationObserver(handleResize)
    const sidebar = document.querySelector('aside')
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] })
    }

    // Verificar estado inicial
    handleResize()

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        "transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    />
  )
} 