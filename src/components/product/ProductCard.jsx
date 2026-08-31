import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/slices/cartSlice'
import { addToWishlist } from '@/redux/slices/wishlistSlice'
import ProductRating from './ProductRating'
import { formatCurrency } from '@/utils/formatCurrency'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100">
          <img
            src={product.images?.[0] || '/placeholder-product.png'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <ProductRating rating={product.rating || 0} count={product.reviewCount || 0} />
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</span>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(addToWishlist(product))}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
