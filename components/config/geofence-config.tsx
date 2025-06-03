'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function GeofenceConfig() {
  const [radius, setRadius] = useState('1000')
  const [unit, setUnit] = useState('meters')

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(e.target.value)
  }

  const handleUnitChange = (value: string) => {
    setUnit(value)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Geocercas</CardTitle>
          <CardDescription>
            Configura las zonas geográficas y sus radios de cobertura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Radio de Cobertura</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  value={radius}
                  onChange={handleRadiusChange}
                  className="w-32"
                />
                <Select
                  value={unit}
                  onValueChange={handleUnitChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Metros</SelectItem>
                    <SelectItem value="kilometers">Kilómetros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              <Button>Guardar Configuración</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zonas Geográficas</CardTitle>
          <CardDescription>
            Gestiona las zonas geográficas y sus asignaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                No hay zonas geográficas configuradas
              </p>
              <Button variant="outline">Agregar Zona</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 