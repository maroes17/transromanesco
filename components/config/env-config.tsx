'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function EnvConfig() {
  const [envVars, setEnvVars] = useState({
    // Base de datos
    DATABASE_URL: '',
    SUPABASE_URL: '',
    SUPABASE_ANON_KEY: '',
    
    // Autenticación
    CLERK_SECRET_KEY: '',
    CLERK_PUBLISHABLE_KEY: '',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: '',
    
    // APIs y Servicios
    GOOGLE_MAPS_API_KEY: '',
    SENDGRID_API_KEY: '',
    
    // Configuración de la aplicación
    NODE_ENV: 'development',
    NEXT_PUBLIC_APP_URL: '',
    
    // Configuración de seguridad
    JWT_SECRET: '',
    ENCRYPTION_KEY: '',
    
    // Configuración de almacenamiento
    STORAGE_BUCKET: '',
    STORAGE_REGION: '',
    
    // Configuración de notificaciones
    NOTIFICATION_EMAIL_FROM: '',
    NOTIFICATION_EMAIL_REPLY_TO: '',
  })

  const handleEnvVarChange = (key: string, value: string) => {
    setEnvVars(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Aquí implementaremos la lógica para guardar las variables de entorno
    console.log('Guardando variables de entorno:', envVars)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Variables de Entorno</CardTitle>
          <CardDescription>
            Configura las variables de entorno del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="database" className="space-y-4">
            <TabsList>
              <TabsTrigger value="database">Base de Datos</TabsTrigger>
              <TabsTrigger value="auth">Autenticación</TabsTrigger>
              <TabsTrigger value="apis">APIs y Servicios</TabsTrigger>
              <TabsTrigger value="app">Aplicación</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="storage">Almacenamiento</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="database" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="DATABASE_URL">DATABASE_URL</Label>
                  <Input
                    id="DATABASE_URL"
                    type="password"
                    value={envVars.DATABASE_URL}
                    onChange={(e) => handleEnvVarChange('DATABASE_URL', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="SUPABASE_URL">SUPABASE_URL</Label>
                  <Input
                    id="SUPABASE_URL"
                    type="password"
                    value={envVars.SUPABASE_URL}
                    onChange={(e) => handleEnvVarChange('SUPABASE_URL', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="SUPABASE_ANON_KEY">SUPABASE_ANON_KEY</Label>
                  <Input
                    id="SUPABASE_ANON_KEY"
                    type="password"
                    value={envVars.SUPABASE_ANON_KEY}
                    onChange={(e) => handleEnvVarChange('SUPABASE_ANON_KEY', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="auth" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="CLERK_SECRET_KEY">CLERK_SECRET_KEY</Label>
                  <Input
                    id="CLERK_SECRET_KEY"
                    type="password"
                    value={envVars.CLERK_SECRET_KEY}
                    onChange={(e) => handleEnvVarChange('CLERK_SECRET_KEY', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="CLERK_PUBLISHABLE_KEY">CLERK_PUBLISHABLE_KEY</Label>
                  <Input
                    id="CLERK_PUBLISHABLE_KEY"
                    type="password"
                    value={envVars.CLERK_PUBLISHABLE_KEY}
                    onChange={(e) => handleEnvVarChange('CLERK_PUBLISHABLE_KEY', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</Label>
                  <Input
                    id="NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
                    type="password"
                    value={envVars.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
                    onChange={(e) => handleEnvVarChange('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="apis" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="GOOGLE_MAPS_API_KEY">GOOGLE_MAPS_API_KEY</Label>
                  <Input
                    id="GOOGLE_MAPS_API_KEY"
                    type="password"
                    value={envVars.GOOGLE_MAPS_API_KEY}
                    onChange={(e) => handleEnvVarChange('GOOGLE_MAPS_API_KEY', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="SENDGRID_API_KEY">SENDGRID_API_KEY</Label>
                  <Input
                    id="SENDGRID_API_KEY"
                    type="password"
                    value={envVars.SENDGRID_API_KEY}
                    onChange={(e) => handleEnvVarChange('SENDGRID_API_KEY', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="app" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="NODE_ENV">NODE_ENV</Label>
                  <Input
                    id="NODE_ENV"
                    value={envVars.NODE_ENV}
                    onChange={(e) => handleEnvVarChange('NODE_ENV', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="NEXT_PUBLIC_APP_URL">NEXT_PUBLIC_APP_URL</Label>
                  <Input
                    id="NEXT_PUBLIC_APP_URL"
                    value={envVars.NEXT_PUBLIC_APP_URL}
                    onChange={(e) => handleEnvVarChange('NEXT_PUBLIC_APP_URL', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="JWT_SECRET">JWT_SECRET</Label>
                  <Input
                    id="JWT_SECRET"
                    type="password"
                    value={envVars.JWT_SECRET}
                    onChange={(e) => handleEnvVarChange('JWT_SECRET', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ENCRYPTION_KEY">ENCRYPTION_KEY</Label>
                  <Input
                    id="ENCRYPTION_KEY"
                    type="password"
                    value={envVars.ENCRYPTION_KEY}
                    onChange={(e) => handleEnvVarChange('ENCRYPTION_KEY', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="storage" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="STORAGE_BUCKET">STORAGE_BUCKET</Label>
                  <Input
                    id="STORAGE_BUCKET"
                    value={envVars.STORAGE_BUCKET}
                    onChange={(e) => handleEnvVarChange('STORAGE_BUCKET', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="STORAGE_REGION">STORAGE_REGION</Label>
                  <Input
                    id="STORAGE_REGION"
                    value={envVars.STORAGE_REGION}
                    onChange={(e) => handleEnvVarChange('STORAGE_REGION', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="NOTIFICATION_EMAIL_FROM">NOTIFICATION_EMAIL_FROM</Label>
                  <Input
                    id="NOTIFICATION_EMAIL_FROM"
                    type="email"
                    value={envVars.NOTIFICATION_EMAIL_FROM}
                    onChange={(e) => handleEnvVarChange('NOTIFICATION_EMAIL_FROM', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="NOTIFICATION_EMAIL_REPLY_TO">NOTIFICATION_EMAIL_REPLY_TO</Label>
                  <Input
                    id="NOTIFICATION_EMAIL_REPLY_TO"
                    type="email"
                    value={envVars.NOTIFICATION_EMAIL_REPLY_TO}
                    onChange={(e) => handleEnvVarChange('NOTIFICATION_EMAIL_REPLY_TO', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="pt-6">
            <Button onClick={handleSave}>Guardar Variables de Entorno</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 