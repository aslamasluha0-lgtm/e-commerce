import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingCart, Heart, ArrowLeft, PackageCheck, ShieldCheck, Truck, Minus, Plus, Box, Zap } from 'lucide-react'
import { useProduct } from '@/hooks/useProduct'
import { useProducts } from '@/hooks/useProducts'
import { useReviewQueries } from '@/queries/reviewQueries'
import ProductImageGallery from '@/components/product/ProductImageGallery'
import ProductRating from '@/components/product/ProductRating'
import ReviewList from '@/components/review/ReviewList'
import Button from '@/components/common/Button'
import Price from '@/components/common/Price'
import Badge from '@/components/common/Badge'
import { ProductDetailsSkeleton } from '@/components/common/Skeletons'
import ProductGrid from '@/components/product/ProductGrid'
import SectionHeader from '@/components/common/SectionHeader'
import { addToCart } from '@/redux/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/redux/slices/wishlistSlice'
import { setBuyNowItem } from '@/redux/slices/checkoutSlice'
import { useToast } from '@/hooks/useToast'
import { getEffectivePrice, getOriginalPrice } from '@/utils/helpers'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'specs', label: 'Specifications' },
  { id: 'features', label: 'Features' },
]

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: product, isLoading } = useProduct(id)
  const { success, error } = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  const [quantity, setQuantity] = useState(1)

  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isWishlisted = wishlistItems.some((item) => String(item.id) === String(id))

  const { data: relatedData, isLoading: relatedLoading } = useProducts({
    categoryId: product?.categoryId,
    _limit: 4,
  })
  const related = relatedData?.items

  const { useProductReviews } = useReviewQueries()
  const { data: reviews = [], isLoading: reviewsLoading } = useProductReviews(id)

  if (isLoading) return <ProductDetailsSkeleton />
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-lg text-surface-500 dark:text-surface-400">Product not found</p>
        <Link to="/products">
          <Button size="lg" className="mt-6">Browse Products</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product))
    }
    success('Added to cart', `${product.name} × ${quantity}`)
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id))
      success('Removed from wishlist', product.name)
    } else {
      dispatch(addToWishlist(product))
      success('Added to wishlist', product.name)
    }
  }

  const handleBuyNow = () => {
    if (!product) {
      error('Unable to proceed to checkout. Please try again.')
      return
    }
    if (product.stock === 0) {
      error('This product is out of stock.', 'Please try another item.')
      return
    }
    const qty = Math.min(quantity, product.stock)
    dispatch(setBuyNowItem({ product, quantity: qty }))
    navigate('/checkout')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-surface-600 transition-colors hover:text-brand-700 dark:text-surface-300 dark:hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      {/* Main layout */}
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductImageGallery images={product.images || []} />

        <div>
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {product.brand}
            </p>
          )}
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl dark:text-surface-50">
            {product.name}
          </h1>

          <div className="mt-3">
            <ProductRating
              rating={product.rating || 0}
              count={product.reviewCount || 0}
              showNumber
            />
          </div>

          <div className="mt-5">
            <Price price={getEffectivePrice(product)} originalPrice={getOriginalPrice(product)} size="lg" />
          </div>

          <p className="mt-5 leading-relaxed text-surface-600 dark:text-surface-300">
            {product.description}
          </p>

          {/* Availability & meta */}
          <div className="mt-6 flex flex-wrap gap-2">
            {product.stock > 0 ? (
              <Badge variant="success">
                <PackageCheck className="h-3.5 w-3.5" /> In Stock ({product.stock} available)
              </Badge>
            ) : (
              <Badge variant="danger">Out of Stock</Badge>
            )}
            {product.sku && <Badge variant="subtle">{product.sku}</Badge>}
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-200">
              Quantity
            </span>
            <div className="inline-flex items-center rounded-xl border border-surface-200 dark:border-surface-700">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center rounded-l-xl text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex h-10 w-12 items-center justify-center text-sm font-semibold text-surface-900 dark:text-surface-100">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center rounded-r-xl text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full"
              variant="primary"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <Zap className="h-5 w-5" />
              Buy Now
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant={isWishlisted ? 'secondary' : 'outline'}
                onClick={handleWishlist}
                className="sm:flex-initial"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </Button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-surface-200 bg-surface-50 p-4 dark:border-surface-800 dark:bg-surface-900/50">
            {[
              { Icon: Truck, label: 'Free shipping' },
              { Icon: ShieldCheck, label: 'Secure payment' },
              { Icon: Box, label: 'Easy returns' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" strokeWidth={1.75} />
                <span className="text-xs font-medium text-surface-600 dark:text-surface-300">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 overflow-x-auto border-b border-surface-200 dark:border-surface-800">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-brand-700 dark:text-brand-300'
                  : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-600" />
              )}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'overview' && (
            <p className="max-w-3xl leading-relaxed text-surface-600 dark:text-surface-300">
              {product.description}
            </p>
          )}

          {activeTab === 'specs' && product.specifications && (
            <div className="grid max-w-3xl grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between gap-4 border-b border-surface-100 py-2.5 dark:border-surface-800"
                >
                  <span className="text-sm capitalize text-surface-500 dark:text-surface-400">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'features' && (
            <ul className="max-w-3xl grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(product.features || []).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-surface-200 bg-surface-50 p-4 dark:border-surface-800 dark:bg-surface-900/50"
                >
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500" />
                  <span className="text-sm text-surface-700 dark:text-surface-200">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <SectionHeader
          subtitle="What buyers say"
          title="Customer Reviews"
        />
        <div className="mt-6">
          {reviewsLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900">
                  <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="h-4 w-4 rounded bg-surface-200 dark:bg-surface-700" />
                    ))}
                  </div>
                  <div className="h-4 w-32 rounded bg-surface-200 dark:bg-surface-700 mb-2" />
                  <div className="h-3 w-full rounded bg-surface-200 dark:bg-surface-700" />
                </div>
              ))}
            </div>
          ) : (
            <ReviewList reviews={reviews} />
          )}
        </div>
      </section>

      {/* Related products */}
      {related?.length > 0 && (
        <section className="mt-16">
          <SectionHeader
            subtitle="You may also like"
            title="Related Products"
            actionLabel="View all"
            actionTo="/products"
          />
          <div className="mt-6">
            <ProductGrid
              products={related.filter((p) => String(p.id) !== String(id))}
              loading={relatedLoading}
              skeletonCount={4}
            />
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetails
