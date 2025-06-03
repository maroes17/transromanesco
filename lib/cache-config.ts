type CacheConfig = {
  DYNAMIC: {
    revalidate: number
    tags: string[]
  }
  SEMI_STATIC: {
    revalidate: number
    tags: string[]
  }
  STATIC: {
    revalidate: number
    tags: string[]
  }
  NO_CACHE: {
    cache: 'no-store'
    tags: string[]
  }
}

export const CACHE_CONFIG: CacheConfig = {
  // Configuración para datos dinámicos que necesitan actualización frecuente
  DYNAMIC: {
    revalidate: 0,
    tags: ['dynamic'],
  },
  
  // Configuración para datos semi-estáticos que pueden actualizarse periódicamente
  SEMI_STATIC: {
    revalidate: 60, // 1 minuto
    tags: ['semi-static'],
  },
  
  // Configuración para datos estáticos que raramente cambian
  STATIC: {
    revalidate: 3600, // 1 hora
    tags: ['static'],
  },
  
  // Configuración para datos que nunca deben cachearse
  NO_CACHE: {
    cache: 'no-store',
    tags: ['no-cache'],
  },
}

// Función helper para generar tags de caché
export function generateCacheTag(prefix: string, id?: string | number) {
  return id ? `${prefix}:${id}` : prefix
}

// Función helper para invalidar caché por tag
export async function revalidateTag(tag: string) {
  try {
    await fetch(`/api/revalidate?tag=${tag}`, { method: 'POST' })
  } catch (error) {
    console.error('Error revalidando caché:', error)
  }
} 