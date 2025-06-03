'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ROLES } from '@/lib/auth/roles'
import { PermissionGuard } from '@/components/auth/permission-guard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CreateUserForm } from './create-user-form'

interface Usuario {
  id: string
  nombre: string
  email: string
  rol: string
  estado: string
  ultimo_acceso: string
  intentos_fallidos: number
  creado_en: string
  actualizado_en: string
}

export function UserManagement() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    try {
      console.log('Iniciando fetch de usuarios...')
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .order('creado_en', { ascending: false })

      if (error) {
        console.error('Error al cargar usuarios:', error)
        throw error
      }

      console.log('Usuarios cargados:', data)
      setUsuarios(data || [])
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ 
          estado: nuevoEstado,
          actualizado_en: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error
      fetchUsuarios()
    } catch (error) {
      console.error('Error al actualizar estado:', error)
    }
  }

  const actualizarRol = async (id: string, nuevoRol: string) => {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ 
          rol: nuevoRol,
          actualizado_en: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error
      fetchUsuarios()
    } catch (error) {
      console.error('Error al actualizar rol:', error)
    }
  }

  const usuariosFiltrados = usuarios.filter(usuario => 
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.rol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div>Cargando usuarios...</div>
  }

  return (
    <PermissionGuard
      requiredPermissions={['manage_users']}
      fallback={<div>No tienes permisos para ver esta sección</div>}
    >
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
          <CreateUserForm onUserCreated={fetchUsuarios} />
        </div>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {usuario.nombre}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{usuario.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={usuario.rol}
                        onChange={(e) => actualizarRol(usuario.id, e.target.value)}
                        className="text-sm text-gray-900 border-gray-300 rounded-md"
                      >
                        {Object.values(ROLES).map((rol) => (
                          <option key={rol} value={rol}>
                            {rol.charAt(0).toUpperCase() + rol.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={usuario.estado}
                        onChange={(e) => actualizarEstado(usuario.id, e.target.value)}
                        className="text-sm text-gray-900 border-gray-300 rounded-md"
                      >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="bloqueado">Bloqueado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(usuario.ultimo_acceso).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => actualizarEstado(usuario.id, 'bloqueado')}
                      >
                        Bloquear
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PermissionGuard>
  )
} 