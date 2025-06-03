'use client'

import { UserButton } from '@clerk/nextjs'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar } from '@/contexts/sidebar-context'
import { cn } from '@/lib/utils'

export function Header() {
  const { isCollapsed } = useSidebar()

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className={cn(
        "flex h-16 items-center justify-between px-4",
        isCollapsed ? "md:pl-16" : "md:pl-64"
      )}>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Notificación de ejemplo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
} 