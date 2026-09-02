import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center h-10 w-10 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white ${className}`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}

export default ThemeToggle