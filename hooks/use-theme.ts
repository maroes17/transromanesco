'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemePreferences {
  theme: Theme
  highContrast: boolean
  reducedMotion: boolean
}

const THEME_STORAGE_KEY = 'theme-preferences'

export function useTheme() {
  const [preferences, setPreferences] = useState<ThemePreferences>(() => {
    if (typeof window === 'undefined') {
      return {
        theme: 'system',
        highContrast: false,
        reducedMotion: false
      }
    }

    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }

    return {
      theme: 'system',
      highContrast: false,
      reducedMotion: false
    }
  })

  useEffect(() => {
    // Guardar preferencias en localStorage
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preferences))

    // Aplicar tema
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (preferences.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(preferences.theme)
    }

    // Aplicar alto contraste
    if (preferences.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Aplicar reducción de movimiento
    if (preferences.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }
  }, [preferences])

  const setTheme = (theme: Theme) => {
    setPreferences(prev => ({ ...prev, theme }))
  }

  const setHighContrast = (enabled: boolean) => {
    setPreferences(prev => ({ ...prev, highContrast: enabled }))
  }

  const setReducedMotion = (enabled: boolean) => {
    setPreferences(prev => ({ ...prev, reducedMotion: enabled }))
  }

  return {
    theme: preferences.theme,
    highContrast: preferences.highContrast,
    reducedMotion: preferences.reducedMotion,
    setTheme,
    setHighContrast,
    setReducedMotion
  }
} 