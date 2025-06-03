'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ROLES } from '@/lib/auth/roles'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CreateUserFormProps {
  onUserCreated: () => void
}

export function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: 'usuario',
    estado: 'activo'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('usuarios')
        .insert([{
          ...formData,
          ultimo_acceso: new Date().toISOString(),
          intentos_fallidos: 0,
          creado_en: new Date().toISOString(),
          actualizado_en: new Date().toISOString()
        }])

      if (error) throw error

      setFormData({
        nombre: '',
        email: '',
        rol: 'usuario',
        estado: 'activo'
      })
      setOpen(false)
      onUserCreated()
    } catch (error) {
      console.error('Error al crear usuario:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Crear Usuario</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Complete el formulario para crear un nuevo usuario en el sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rol">Rol</Label>
              <Select
                value={formData.rol}
                onValueChange={(value) => setFormData({ ...formData, rol: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un rol" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ROLES).map((rol) => (
                    <SelectItem key={rol} value={rol}>
                      {rol.charAt(0).toUpperCase() + rol.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Select
                value={formData.estado}
                onValueChange={(value) => setFormData({ ...formData, estado: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  <SelectItem value="bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Usuario'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 