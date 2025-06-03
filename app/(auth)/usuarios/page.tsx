'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from '@supabase/ssr'
import { toast } from "sonner"

interface User {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'operador' | 'chofer' | 'cliente' | 'supervisor'
  estado: 'activo' | 'inactivo' | 'bloqueado'
  ultimo_acceso: string | null
  intentos_fallidos: number
  creado_en: string
  actualizado_en: string
}

const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'operador', label: 'Operador' },
  { value: 'chofer', label: 'Chofer' },
  { value: 'cliente', label: 'Cliente' },
  { value: 'supervisor', label: 'Supervisor' }
]

const estados = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
  { value: 'bloqueado', label: 'Bloqueado' }
]

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Nunca'
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: '',
    estado: ''
  })
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchUsers()
  }, [supabase])

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('creado_en', { ascending: false })

    if (error) {
      console.error('Error al obtener usuarios:', error)
      toast.error('Error al cargar los usuarios')
      return
    }

    if (data) {
      setUsers(data)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      estado: user.estado
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return
    }

    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', userId)

    if (error) {
      console.error('Error al eliminar usuario:', error)
      toast.error('Error al eliminar el usuario')
      return
    }

    toast.success('Usuario eliminado correctamente')
    fetchUsers()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre || !formData.email || !formData.rol || !formData.estado) {
      toast.error('Por favor completa todos los campos')
      return
    }

    if (editingUser) {
      // Actualizar usuario existente
      const { error } = await supabase
        .from('usuarios')
        .update({
          nombre: formData.nombre,
          email: formData.email,
          rol: formData.rol,
          estado: formData.estado,
          actualizado_en: new Date().toISOString()
        })
        .eq('id', editingUser.id)

      if (error) {
        console.error('Error al actualizar usuario:', error)
        toast.error('Error al actualizar el usuario')
        return
      }

      toast.success('Usuario actualizado correctamente')
    } else {
      // Crear nuevo usuario
      const { error } = await supabase
        .from('usuarios')
        .insert([{
          nombre: formData.nombre,
          email: formData.email,
          rol: formData.rol,
          estado: formData.estado,
          intentos_fallidos: 0,
          creado_en: new Date().toISOString(),
          actualizado_en: new Date().toISOString()
        }])

      if (error) {
        console.error('Error al crear usuario:', error)
        toast.error('Error al crear el usuario')
        return
      }

      toast.success('Usuario creado correctamente')
    }

    handleCloseDialog()
    fetchUsers()
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingUser(null)
    setFormData({
      nombre: '',
      email: '',
      rol: '',
      estado: ''
    })
  }

  const getEstadoVariant = (estado: User['estado']) => {
    switch (estado) {
      case 'activo':
        return 'default'
      case 'inactivo':
        return 'secondary'
      case 'bloqueado':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const getRolLabel = (rol: User['rol']) => {
    return roles.find(r => r.value === rol)?.label || rol
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los usuarios del sistema
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  placeholder="Nombre completo"
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
                  placeholder="correo@ejemplo.com"
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
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((rol) => (
                      <SelectItem key={rol.value} value={rol.value}>
                        {rol.label}
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
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((estado) => (
                      <SelectItem key={estado.value} value={estado.value}>
                        {estado.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último Acceso</TableHead>
              <TableHead>Intentos Fallidos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.nombre}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRolLabel(user.rol)}</TableCell>
                <TableCell>
                  <Badge variant={getEstadoVariant(user.estado)}>
                    {user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.ultimo_acceso)}</TableCell>
                <TableCell>{user.intentos_fallidos}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(user)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 