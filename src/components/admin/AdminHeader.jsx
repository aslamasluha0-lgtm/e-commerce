import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { LogOut, Menu } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import ThemeToggle from '@/components/common/ThemeToggle'

const TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/new': 'Add Product',
  '/admin/users': 'Users',
  '/admin/orders': 'Orders',
}

const getTitle = (pathname) => {
  if (pathname.startsWith('/admin/products/') && pathname.endsWith('/edit')) {
    return 'Edit Product'
  }
  if (pathname.startsWith('/admin/orders/')) {
    return 'Order Details'
  }
  return TITLES[pathname] || 'Admin'
}

const AdminHeader = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { adminUser, logout } = useAdminAuth()
  const { pathname } = useLocation()

  const handleLogout = () => {
    logout()
    queryClient.clear()
    navigate('/admin/login', { replace: true })
  }

  const title = getTitle(pathname)

  return (
    <header className="sticky top-0 z-20 border-b border-surface-200/80 bg-white/80 backdrop-blur-xl dark:border-surface-800 dark:bg-surface-900/80">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900 lg:hidden dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-base font-semibold tracking-tight text-surface-900 dark:text-surface-50">
              {title}
            </p>
            <p className="truncate text-xs text-surface-500 dark:text-surface-400">
              DevTech Admin
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          {adminUser && (
            <div className="hidden items-center gap-2.5 rounded-full border border-surface-200 py-1 pl-1 pr-3 md:flex dark:border-surface-700">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                {((adminUser.name || adminUser.email || 'A').charAt(0)).toUpperCase()}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium text-surface-900 dark:text-white">
                  {adminUser.name || 'Admin'}
                </span>
                <span className="block max-w-[180px] truncate text-xs text-surface-500 dark:text-surface-400">
                  {adminUser.email}
                </span>
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-surface-200 bg-white px-3 text-sm font-medium text-surface-700 transition-colors hover:border-surface-300 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader