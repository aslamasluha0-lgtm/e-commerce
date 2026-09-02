import { createContext } from 'react'

export const ThemeContext = createContext(null)

export const THEME_STORAGE_KEY = 'theme'

export const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}