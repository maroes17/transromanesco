// components/auth/permission-guard.tsx
'use client'

import { usePermissions } from '@/lib/hooks/use-permissions'
import { ReactNode } from 'react'

interface PermissionGuardProps {
  children: ReactNode
  requiredPermissions: string[]
  fallback?: ReactNode
}

export function PermissionGuard({
  children,
  requiredPermissions,
  fallback = null
}: PermissionGuardProps) {
  const { hasAllPermissions } = usePermissions()

  if (!hasAllPermissions(requiredPermissions)) {
    return fallback
  }

  return <>{children}</>
}