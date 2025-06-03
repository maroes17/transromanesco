'use client'

import { useState, useEffect } from 'react'
import { CACHE_CONFIG, generateCacheTag } from '../cache-config'

interface FetchOptions {
  cache?: keyof typeof CACHE_CONFIG
  tag?: string
  id?: string | number
}

export function useFetch<T>(
  url: string,
  options: FetchOptions = { cache: 'DYNAMIC' }
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const cacheConfig = CACHE_CONFIG[options.cache || 'DYNAMIC']
        const tag = options.tag ? generateCacheTag(options.tag, options.id) : undefined

        const fetchOptions: RequestInit = {
          next: {
            tags: tag ? [tag, ...cacheConfig.tags] : [...cacheConfig.tags],
          },
        }

        // Agregar revalidate solo si no es NO_CACHE
        if (options.cache !== 'NO_CACHE') {
          fetchOptions.next = {
            ...fetchOptions.next,
            revalidate: cacheConfig.revalidate,
          }
        }

        const response = await fetch(url, fetchOptions)

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.statusText}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, options.cache, options.tag, options.id])

  return { data, error, loading }
} 