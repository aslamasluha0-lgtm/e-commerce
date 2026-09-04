import { Trash2, ShoppingCart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeFromWishlist } from '@/redux/slices/wishlistSlice'
import { addToCart } from '@/redux/slices/cartSlice'
import ProductImage from '@/components/common/ProductImage'
import ProductRating from '@/components/product/ProductRating'
import Price from '@/components/common/Price'
import Badge from '@/components/common/Badge'
import { useToast } from '@/hooks/useToast'
import { Link } from 'react-router-dom'
import { getEffectivePrice, getOriginalPrice } from '@/utils/helpers'

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch()
  const { success } = useToast()
  const effectivePrice = getEffectivePrice(item)
  const originalPrice = getOriginalPrice(item)

  const handleAddToCart = () => {
    dispatch(addToCart(item))
    dispatch(removeFromWishlist(item.id))
    success('Added to cart', item.name)
  }

  const handleRemove = () => {
    dispatch(removeFromWishlist(item.id))
    success('Removed from wishlist', item.name)
  }

  return (
    <div className="flex gap-4 rounded-2xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900">
      <Link to={`/products/${item.id}`} className="flex-shrink-0">
        <ProductImage
          src={item.images?.[0]}
          alt={item.name}
          className="h-28 w-28 rounded-xl border border-surface-100 object-cover dark:border-surface-800"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
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
            aria-label={`Remove ${item.name} from wishlist`}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-surface-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-surface-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2">
          <ProductRating rating={item.rating || 0} count={item.reviewCount || 0} />
        </div>

        <div className="mt-2">
          <Price price={effectivePrice} originalPrice={originalPrice} />
        </div>

        <div className="mt-1">
          {item.stock > 0 ? (
            <Badge variant="success">In Stock</Badge>
          ) : (
            <Badge variant="danger">Out of Stock</Badge>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={item.stock === 0}
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default WishlistItem
