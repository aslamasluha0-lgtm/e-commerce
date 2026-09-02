import { useDispatch } from 'react-redux'
import { removeFromCompare } from '@/redux/slices/compareSlice'
import { formatCurrency } from '@/utils/formatCurrency'
import ProductImage from '@/components/common/ProductImage'
import { X } from 'lucide-react'

const ComparisonTable = ({ products }) => {
  const dispatch = useDispatch()

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Product</th>
          {products.map((product) => (
            <th key={product.id} className="p-4 text-center">
              <div className="relative">
                <button
                  onClick={() => dispatch(removeFromCompare(product.id))}
                  className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
                <ProductImage
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
                <p className="mt-2 font-medium text-sm">{product.name}</p>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="p-4 text-sm font-medium text-gray-500">Price</td>
          {products.map((product) => (
            <td key={product.id} className="p-4 text-center font-semibold">
              {formatCurrency(product.price)}
            </td>
          ))}
        </tr>
        <tr className="border-t bg-gray-50 dark:bg-gray-800/50">
          <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Rating</td>
          {products.map((product) => (
            <td key={product.id} className="p-4 text-center">
              {product.rating || 'N/A'}
            </td>
          ))}
        </tr>
        <tr className="border-t">
          <td className="p-4 text-sm font-medium text-gray-500">Category</td>
          {products.map((product) => (
            <td key={product.id} className="p-4 text-center">
              {product.category || 'N/A'}
            </td>
          ))}
        </tr>
        <tr className="border-t bg-gray-50 dark:bg-gray-800/50">
          <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Availability</td>
          {products.map((product) => (
            <td key={product.id} className="p-4 text-center">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default ComparisonTable
