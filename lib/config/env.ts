import { z } from 'zod'

// Esquema de validación para las variables de entorno
const envSchema = z.object({
  // Base de datos
  DATABASE_URL: z.string().url(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  
  // Autenticación
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  
  // APIs y Servicios
  GOOGLE_MAPS_API_KEY: z.string().min(1),
  SENDGRID_API_KEY: z.string().min(1),
  
  // Configuración de la aplicación
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  
  // Configuración de seguridad
  JWT_SECRET: z.string().min(1),
  ENCRYPTION_KEY: z.string().min(1),
  
  // Configuración de almacenamiento
  STORAGE_BUCKET: z.string().min(1),
  STORAGE_REGION: z.string().min(1),
  
  // Configuración de notificaciones
  NOTIFICATION_EMAIL_FROM: z.string().email(),
  NOTIFICATION_EMAIL_REPLY_TO: z.string().email(),
})

// Función para validar las variables de entorno
export function validateEnv() {
  try {
    envSchema.parse(process.env)
    return true
  } catch (error) {
    console.error('❌ Variables de entorno inválidas:', error)
    return false
  }
}

// Tipos para las variables de entorno
export type Env = z.infer<typeof envSchema>

// Función para obtener una variable de entorno con tipo
export function getEnvVar<K extends keyof Env>(key: K): Env[K] {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Variable de entorno ${key} no definida`)
  }
  return value as Env[K]
}

// Función para obtener todas las variables de entorno
export function getAllEnvVars(): Env {
  return process.env as unknown as Env
}

// Función para verificar si estamos en producción
export function isProduction(): boolean {
  return getEnvVar('NODE_ENV') === 'production'
}

// Función para verificar si estamos en desarrollo
export function isDevelopment(): boolean {
  return getEnvVar('NODE_ENV') === 'development'
}

// Función para verificar si estamos en pruebas
export function isTest(): boolean {
  return getEnvVar('NODE_ENV') === 'test'
} 