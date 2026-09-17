import { NavLink, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  X,
  LogOut,
  Command,
} from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { adminUser, logout } = useAdminAuth()

  const handleLogout = () => {
    logout()
    queryClient.clear()
    navigate('/admin/login', { replace: true })
  }

  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
        : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-white'
    }`

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  ]

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-surface-200 bg-white p-4 transition-transform duration-200 lg:static lg:z-auto lg:min-h-screen lg:translate-x-0 dark:border-surface-800 dark:bg-surface-900 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Admin sidebar"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
            <Command className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-surface-900 dark:text-white">
              DevTech
            </p>
            <p className="text-xs font-medium text-surface-500 dark:text-surface-400">
              Admin Panel
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-900 lg:hidden dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-6 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} className={navLinkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-600 dark:bg-brand-400"
                    aria-hidden="true"
                  />
                )}
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-surface-200 bg-surface-50 p-3 dark:border-surface-800 dark:bg-surface-950/50">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
              {((adminUser?.name || adminUser?.email || 'A').charAt(0)).toUpperCase()}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium text-surface-900 dark:text-surface-50">
                {adminUser?.name || 'Admin'}
              </p>
              <p className="truncate text-xs text-surface-500 dark:text-surface-400">
                {adminUser?.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm font-medium text-surface-700 transition-colors hover:border-surface-300 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar