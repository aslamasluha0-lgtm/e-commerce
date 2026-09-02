import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { formatCurrency } from '@/utils/formatCurrency'
import Button from '@/components/common/Button'
import Loader from '@/components/common/Loader'
import ProductImage from '@/components/common/ProductImage'

const ProductsManagement = () => {
  const { data: products, isLoading } = useProducts({ _limit: 50 })

  if (isLoading) return <Loader className="py-20" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold dark:text-gray-100">Products Management</h1>
        <Link to="/admin/products/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products?.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <ProductImage
                      src={product.images?.[0]}
                      alt=""
                      className="w-10 h-10 object-cover rounded dark:bg-gray-700"
                    />
                    <span className="font-medium dark:text-gray-100">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 dark:text-gray-200">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4 dark:text-gray-200">{product.stock}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsManagement
