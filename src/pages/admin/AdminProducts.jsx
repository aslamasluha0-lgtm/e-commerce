import { Link } from 'react-router-dom'

const AdminProducts = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Products</h1>
        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>
      <p className="text-surface-600 dark:text-surface-400">
        Product management will be implemented later.
      </p>
    </div>
  )
}

export default AdminProducts
