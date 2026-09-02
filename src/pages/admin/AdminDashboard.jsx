import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Products', value: '0', icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: '0', icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Total Users', value: '0', icon: Users, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$0', icon: DollarSign, color: 'bg-yellow-500' },
  ]

  const quickLinks = [
    { label: 'Manage Products', to: '/admin/products' },
    { label: 'Manage Orders', to: '/admin/orders' },
    { label: 'Manage Users', to: '/admin/users' },
    { label: 'Manage Categories', to: '/admin/categories' },
    { label: 'Manage Coupons', to: '/admin/coupons' },
    { label: 'View Analytics', to: '/admin/analytics' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold dark:text-gray-100">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center font-medium text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
