import { Minus, Plus, Trash2, Heart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/redux/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/redux/slices/wishlistSlice'
import ProductImage from '@/components/common/ProductImage'
import { formatCurrency } from '@/utils/formatCurrency'
import { useToast } from '@/hooks/useToast'
import { Link } from 'react-router-dom'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const { success } = useToast()
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isWishlisted = wishlistItems.some((w) => w.id === item.id)

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
    success('Removed from cart', item.name)
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(item.id))
      success('Removed from wishlist', item.name)
    } else {
      dispatch(addToWishlist(item))
      success('Saved to wishlist', item.name)
    }
  }

  return (
    <div className="flex gap-4 rounded-2xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900">
      <Link to={`/products/${item.id}`} className="flex-shrink-0">
        <ProductImage
          src={item.images?.[0]}
          alt={item.name}
          className="h-24 w-24 rounded-xl border border-surface-100 object-cover dark:border-surface-800 sm:h-28 sm:w-28"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            {item.brand && (
              <p className="text-xs uppercase tracking-wide text-surface-400 dark:text-surface-500">
                {item.brand}
              </p>
            )}
            <Link
              to={`/products/${item.id}`}
              className="line-clamp-2 text-sm font-semibold text-surface-900 hover:text-brand-700 dark:text-surface-100 dark:hover:text-brand-300"
            >
              {item.name}
            </Link>
          </div>
          <button
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from cart`}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-surface-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-surface-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            {formatCurrency(item.price)} each
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="inline-flex items-center rounded-xl border border-surface-200 dark:border-surface-700">
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) })
                )
              }
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center rounded-l-xl text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex h-9 w-10 items-center justify-center text-sm font-semibold text-surface-900 dark:text-surface-100">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
              }
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center rounded-r-xl text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWishlist}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                isWishlisted
                  ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40'
                  : 'text-surface-400 hover:bg-surface-100 hover:text-red-500 dark:text-surface-500 dark:hover:bg-surface-800'
              }`}
            >
              <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>
            <p className="text-base font-semibold text-surface-900 dark:text-surface-100">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
