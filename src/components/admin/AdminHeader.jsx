import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { LogOut, Menu } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

const AdminHeader = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { adminUser, logout } = useAdminAuth()

  const handleLogout = () => {
    logout()
    queryClient.clear()
    navigate('/admin/login', { replace: true })
  }

  return (
    <header className="h-16 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="p-2 rounded-lg border border-surface-200 text-surface-700 hover:bg-surface-50 dark:border-surface-700 dark:text-surface-200 dark:hover:bg-surface-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
          DevTech Admin
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {adminUser && (
          <span className="hidden text-sm text-surface-600 dark:text-surface-300 sm:inline">
            {adminUser.name || adminUser.email}
          </span>
        )}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-700 transition-colors hover:bg-surface-50 hover:border-surface-300 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </header>
  )
}

export default AdminHeader