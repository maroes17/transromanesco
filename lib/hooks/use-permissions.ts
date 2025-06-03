// lib/hooks/use-permissions.ts
import { useUser } from '@clerk/nextjs'
import { ROLE_PERMISSIONS, Role, Permission } from '@/lib/auth/roles'

export function usePermissions() {
  const { user } = useUser()
  
  const userRole = user?.publicMetadata?.role as Role | undefined
  
  const hasPermission = (permission: Permission) => {
    if (!userRole) return false
    const rolePermissions = ROLE_PERMISSIONS[userRole]
    return rolePermissions ? rolePermissions.includes(permission) : false
  }

  const hasAnyPermission = (permissions: Permission[]) => {
    return permissions.some(permission => hasPermission(permission))
  }

  const hasAllPermissions = (permissions: Permission[]) => {
    return permissions.every(permission => hasPermission(permission))
  }

  return {
    userRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  }
}