'use client'

import { UserManagement } from '@/components/users/user-management'
import { useUserSync } from '@/lib/hooks/use-user-sync'

export default function UsuariosPage() {
  // Asegurar que useUserSync se ejecute
  useUserSync()

  return (
    <div className="h-full">
      <UserManagement />
    </div>
  )
} 