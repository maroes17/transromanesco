// lib/auth/roles.ts
export const ROLES = {
    ADMIN: 'admin',
    OPERADOR: 'operador',
    CHOFER: 'chofer',
    CLIENTE: 'cliente',
    SUPERVISOR: 'supervisor'
  } as const
  
  export type Role = typeof ROLES[keyof typeof ROLES]
  
  export type Permission = 
    | 'manage_users'
    | 'manage_roles'
    | 'manage_vehicles'
    | 'manage_drivers'
    | 'manage_trips'
    | 'manage_maintenance'
    | 'manage_inventory'
    | 'view_reports'
    | 'manage_settings'
    | 'view_own_trips'
    | 'manage_own_expenses'
    | 'view_own_documents'
    | 'view_all_documents'
  
  export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    [ROLES.ADMIN]: [
      'manage_users',
      'manage_roles',
      'manage_vehicles',
      'manage_drivers',
      'manage_trips',
      'manage_maintenance',
      'manage_inventory',
      'view_reports',
      'manage_settings'
    ],
    [ROLES.OPERADOR]: [
      'manage_trips',
      'manage_drivers',
      'view_reports',
      'manage_maintenance'
    ],
    [ROLES.CHOFER]: [
      'view_own_trips',
      'manage_own_expenses',
      'view_own_documents'
    ],
    [ROLES.CLIENTE]: [
      'view_own_trips',
      'view_own_documents'
    ],
    [ROLES.SUPERVISOR]: [
      'view_reports',
      'manage_trips',
      'manage_maintenance',
      'view_all_documents'
    ]
  }