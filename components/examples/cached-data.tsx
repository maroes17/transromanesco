'use client'

import { useFetch } from '@/lib/hooks/use-fetch'
import { CACHE_CONFIG } from '@/lib/cache-config'

interface ExampleData {
  id: number
  title: string
  description: string
}

export function CachedDataExample() {
  // Ejemplo de datos dinámicos (sin caché)
  const { data: dynamicData, loading: dynamicLoading } = useFetch<ExampleData[]>(
    '/api/example/dynamic',
    { cache: 'DYNAMIC', tag: 'dynamic-example' }
  )

  // Ejemplo de datos semi-estáticos (caché de 1 minuto)
  const { data: semiStaticData, loading: semiStaticLoading } = useFetch<ExampleData[]>(
    '/api/example/semi-static',
    { cache: 'SEMI_STATIC', tag: 'semi-static-example' }
  )

  // Ejemplo de datos estáticos (caché de 1 hora)
  const { data: staticData, loading: staticLoading } = useFetch<ExampleData[]>(
    '/api/example/static',
    { cache: 'STATIC', tag: 'static-example' }
  )

  if (dynamicLoading || semiStaticLoading || staticLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Datos Dinámicos</h2>
        <div className="grid gap-4">
          {dynamicData?.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Datos Semi-Estáticos</h2>
        <div className="grid gap-4">
          {semiStaticData?.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Datos Estáticos</h2>
        <div className="grid gap-4">
          {staticData?.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 