import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Users, ShoppingBag, X } from 'lucide-react'

const AdminSidebar = ({ open, onClose }) => {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-surface-200 hover:bg-white/10 hover:text-white'
    }`

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  ]

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-600 text-white p-4 transition-transform duration-200 lg:static lg:translate-x-0 lg:z-auto lg:min-h-screen ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Admin sidebar"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">DevTech Admin</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="p-1.5 rounded text-surface-300 hover:bg-white/10 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} className={navLinkClass}>
            <Icon className="h-4.5 w-4.5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar