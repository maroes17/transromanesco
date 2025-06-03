'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { useSidebar } from '@/contexts/sidebar-context'
import { cn } from '@/lib/utils'
import { Toaster } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isCollapsed } = useSidebar()
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className={cn(
          "flex-1 transition-all duration-300",
          isCollapsed ? "md:pl-16" : "md:pl-64"
        )}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
} 