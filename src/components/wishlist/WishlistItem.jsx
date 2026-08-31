import { Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeFromWishlist } from '@/redux/slices/wishlistSlice'
import { addToCart } from '@/redux/slices/cartSlice'
import { formatCurrency } from '@/utils/formatCurrency'

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex gap-4 py-4 border-b">
      <img
        src={item.images?.[0] || '/placeholder-product.png'}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-lg font-semibold mt-1">{formatCurrency(item.price)}</p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              dispatch(addToCart(item))
              dispatch(removeFromWishlist(item.id))
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <button
            onClick={() => dispatch(removeFromWishlist(item.id))}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistItem
