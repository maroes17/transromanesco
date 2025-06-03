'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function NotificationConfig() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [notificationFrequency, setNotificationFrequency] = useState('realtime')

  const handleEmailNotificationsChange = (checked: boolean) => {
    setEmailNotifications(checked)
    // Aquí implementaremos la lógica para cambiar las notificaciones por email
  }

  const handlePushNotificationsChange = (checked: boolean) => {
    setPushNotifications(checked)
    // Aquí implementaremos la lógica para cambiar las notificaciones push
  }

  const handleFrequencyChange = (value: string) => {
    setNotificationFrequency(value)
    // Aquí implementaremos la lógica para cambiar la frecuencia
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>
            Configura tus preferencias de notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Recibe notificaciones por correo electrónico
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={handleEmailNotificationsChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones Push</Label>
                <p className="text-sm text-muted-foreground">
                  Recibe notificaciones en tiempo real
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={handlePushNotificationsChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Frecuencia de Notificaciones</Label>
              <Select
                value={notificationFrequency}
                onValueChange={handleFrequencyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Tiempo Real</SelectItem>
                  <SelectItem value="hourly">Cada Hora</SelectItem>
                  <SelectItem value="daily">Diario</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button>Guardar Preferencias</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 