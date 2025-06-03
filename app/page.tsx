'use client'

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) {
      router.push('/dashboard')
    } else {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  return null
} 