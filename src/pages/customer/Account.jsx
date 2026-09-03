import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import {
  UserCircle2,
  Package,
  Heart,
  MapPin,
  LogOut,
  User,
  Mail,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/account/profile', label: 'Profile', icon: UserCircle2, end: true },
  { to: '/account/orders', label: 'My Orders', icon: Package },
  { to: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/account/addresses', label: 'Addresses', icon: MapPin },
]

const Account = () => {
  const { user, logout } = useAuth()

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-600 text-white shadow-sm'
        : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
    }`

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">My Account</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Manage your profile, orders, wishlist and addresses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div>
          <div className="lg:sticky lg:top-24 overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-soft dark:border-surface-800 dark:bg-surface-900">
            <div className="border-b border-surface-100 p-5 dark:border-surface-800">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  {user?.name?.charAt(0)?.toUpperCase() || <User className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-surface-900 dark:text-surface-100">
                    {user?.name || 'Account'}
                  </p>
                  <p className="flex items-center gap-1 truncate text-xs text-surface-500 dark:text-surface-400">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{user?.email}</span>
                  </p>
                </div>
              </div>
            </div>

            <nav className="space-y-1 p-3" aria-label="Account navigation">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                Sign out
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Account
