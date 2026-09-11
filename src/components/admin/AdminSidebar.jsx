import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-surface-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">DevTech Admin</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? 'bg-surface-700' : 'hover:bg-surface-800'}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? 'bg-surface-700' : 'hover:bg-surface-800'}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? 'bg-surface-700' : 'hover:bg-surface-800'}`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? 'bg-surface-700' : 'hover:bg-surface-800'}`
          }
        >
          Orders
        </NavLink>
      </nav>
    </aside>
  )
}

export default AdminSidebar
