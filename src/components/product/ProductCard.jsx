import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Eye, Check } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/redux/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/redux/slices/wishlistSlice'
import ProductRating from './ProductRating'
import ProductImage from '@/components/common/ProductImage'
import Price from '@/components/common/Price'
import Badge from '@/components/common/Badge'
import { useToast } from '@/hooks/useToast'
import { getEffectivePrice, getOriginalPrice } from '@/utils/helpers'

const getBadge = (product) => {
  if (product.tags?.includes('new')) return { label: 'NEW', variant: 'brand' }
  if (product.trending || product.tags?.includes('best-seller'))
    return { label: 'BEST SELLER', variant: 'success' }
  if (product.tags?.includes('trending')) return { label: 'TRENDING', variant: 'warning' }
  if (product.discountPrice) return { label: 'SALE', variant: 'danger' }
  if (product.featured) return { label: 'FEATURED', variant: 'brand' }
  return null
}

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { success } = useToast()
  const [added, setAdded] = useState(false)
  const addTimer = useRef(null)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isWishlisted = wishlistItems.some((item) => item.id === product.id)

  const effectivePrice = getEffectivePrice(product)
  const originalPrice = getOriginalPrice(product)
  const outOfStock = product.stock === 0

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id))
      success('Removed from wishlist', product.name)
    } else {
      dispatch(addToWishlist(product))
      success('Added to wishlist', product.name)
    }
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock) return
    dispatch(addToCart(product))
    success('Added to cart', product.name)

    setAdded(true)
    if (addTimer.current) clearTimeout(addTimer.current)
    addTimer.current = setTimeout(() => setAdded(false), 1500)
  }

  const badge = getBadge(product)

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-surface-300 hover:shadow-card-hover dark:border-surface-800 dark:bg-surface-900 dark:hover:border-surface-700 dark:hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6)]"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface-100 dark:bg-surface-800">
        {/* Image zoom + slight upward drift */}
        <ProductImage
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition-transform duration-[400ms] ease-out group-hover:-translate-y-1.5 group-hover:scale-105"
        />

        {/* Subtle bottom gradient overlay for integrated quick actions */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Badge */}
        {badge && (
          <Badge
            variant={badge.variant}
            className="absolute left-3 top-3 uppercase tracking-wide"
          >
            {badge.label}
          </Badge>
        )}

        {/* Stock indicator */}
        {outOfStock && (
          <span className="absolute bottom-3 left-3 rounded-full bg-surface-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            Out of stock
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          tabIndex={0}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-all duration-[250ms] ease-out hover:scale-110 active:scale-95 lg:opacity-85 lg:group-hover:opacity-100 lg:group-hover:scale-105 dark:bg-surface-800/90 ${
            isWishlisted
              ? 'text-red-500'
              : 'text-surface-500 hover:text-red-500 dark:text-surface-300'
          }`}
        >
          <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {/* Quick actions (always visible on mobile, revealed on hover on desktop) */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-0 gap-2 opacity-100 transition-all duration-300 ease-out lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-surface-900/90 px-3 py-2.5 text-sm font-medium text-white backdrop-blur transition-colors duration-200 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white/95 dark:text-surface-900 dark:hover:bg-brand-600 dark:hover:text-white"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-x-0.5" />
                Add to Cart
              </>
            )}
          </button>
          <button
            aria-label="Quick view"
            className="flex h-10 items-center justify-center rounded-xl bg-white/90 px-3 text-surface-700 shadow-soft backdrop-blur transition-colors duration-200 hover:bg-white dark:bg-surface-800/90 dark:text-surface-200 dark:hover:bg-surface-700"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {product.brand && (
          <p className="text-xs font-medium uppercase tracking-wide text-surface-400 dark:text-surface-500">
            {product.brand}
          </p>
        )}
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-surface-900 underline-offset-2 transition-colors duration-200 group-hover:text-brand-700 group-hover:underline dark:text-surface-100 dark:group-hover:text-brand-300">
          {product.name}
        </h3>

        <div className="mt-2">
          <ProductRating rating={product.rating || 0} count={product.reviewCount || 0} />
        </div>

        <div className="mt-auto pt-3">
          <Price price={effectivePrice} originalPrice={originalPrice} />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
