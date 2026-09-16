import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'

const AdminSidebar = ({ open, onClose }) => {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded flex items-center gap-2 ${
      isActive ? 'bg-surface-700' : 'hover:bg-surface-800'
    }`

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
          className="p-1.5 rounded text-surface-300 hover:bg-white-800 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/admin" end className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={navLinkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/users" className={navLinkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/orders" className={navLinkClass}>
          Orders
        </NavLink>
      </nav>
    </aside>
  )
}

export default AdminSidebar