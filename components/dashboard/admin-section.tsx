// components/dashboard/admin-section.tsx
'use client'

import { PermissionGuard } from '@/components/auth/permission-guard'

export function AdminSection() {
  return (
    <PermissionGuard
      requiredPermissions={['manage_users', 'manage_roles']}
      fallback={<div>No tienes permisos para ver esta sección</div>}
    >
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Panel de Administración</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium">Gestión de Usuarios</h3>
            <p className="text-sm text-gray-600">Administra usuarios y roles del sistema</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium">Configuración del Sistema</h3>
            <p className="text-sm text-gray-600">Ajusta la configuración global</p>
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}