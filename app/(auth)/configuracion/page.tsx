"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeConfig } from "@/components/config/theme-config"
import { NotificationConfig } from "@/components/config/notification-config"
import { GeofenceConfig } from "@/components/config/geofence-config"
import { EnvConfig } from "@/components/config/env-config"

export default function ConfiguracionPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Configuración</h1>
      </div>

      <div className="rounded-md border p-6">
        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="theme">Tema y Estilos</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="geofences">Geocercas</TabsTrigger>
            <TabsTrigger value="env">Variables de Entorno</TabsTrigger>
          </TabsList>
          <TabsContent value="theme">
            <ThemeConfig />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationConfig />
          </TabsContent>
          <TabsContent value="geofences">
            <GeofenceConfig />
          </TabsContent>
          <TabsContent value="env">
            <EnvConfig />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 