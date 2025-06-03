'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ROLES } from '@/lib/auth/roles'

export function useUserSync() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded || !user) {
      console.log('Usuario no cargado o no existe')
      return
    }

    const syncUser = async () => {
      try {
        console.log('Iniciando sincronización de usuario:', {
          email: user.emailAddresses[0].emailAddress,
          nombre: `${user.firstName} ${user.lastName}`.trim(),
          metadata: user.publicMetadata
        })
        
        // Verificar si el usuario ya existe en Supabase
        const { data: existingUser, error: fetchError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', user.emailAddresses[0].emailAddress)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error al buscar usuario:', fetchError)
          throw fetchError
        }

        console.log('Usuario existente:', existingUser)

        if (existingUser) {
          // Actualizar usuario existente manteniendo su rol actual
          const { error: updateError } = await supabase
            .from('usuarios')
            .update({
              nombre: `${user.firstName} ${user.lastName}`.trim(),
              ultimo_acceso: new Date().toISOString(),
              actualizado_en: new Date().toISOString(),
              rol: user.publicMetadata?.role || existingUser.rol // Mantener el rol actual o usar el de Clerk
            })
            .eq('email', user.emailAddresses[0].emailAddress)

          if (updateError) {
            console.error('Error al actualizar usuario:', updateError)
            throw updateError
          }

          console.log('Usuario actualizado correctamente')
        } else {
          // Crear nuevo usuario
          const { error: insertError } = await supabase.from('usuarios').insert({
            nombre: `${user.firstName} ${user.lastName}`.trim(),
            email: user.emailAddresses[0].emailAddress,
            rol: user.publicMetadata?.role || ROLES.CLIENTE, // Usar el rol de Clerk o el por defecto
            estado: 'activo',
            ultimo_acceso: new Date().toISOString(),
            creado_en: new Date().toISOString(),
            actualizado_en: new Date().toISOString()
          })

          if (insertError) {
            console.error('Error al crear usuario:', insertError)
            throw insertError
          }

          console.log('Usuario creado correctamente')
        }
      } catch (error) {
        console.error('Error al sincronizar usuario:', error)
      }
    }

    // Forzar la sincronización inicial
    syncUser()
  }, [user, isLoaded])
} 