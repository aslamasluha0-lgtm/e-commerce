import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProduct } from '@/hooks/useProduct'
import ProductImageGallery from '@/components/product/ProductImageGallery'
import ProductRating from '@/components/product/ProductRating'
import ReviewList from '@/components/review/ReviewList'
import Button from '@/components/common/Button'
import Loader from '@/components/common/Loader'
import { addToCart } from '@/redux/slices/cartSlice'
import { addToWishlist } from '@/redux/slices/wishlistSlice'
import { formatCurrency } from '@/utils/formatCurrency'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data: product, isLoading } = useProduct(id)

  if (isLoading) return <Loader className="py-20" />
  if (!product) return <div className="text-center py-20">Product not found</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductImageGallery images={product.images || []} />

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <ProductRating rating={product.rating || 0} count={product.reviewCount || 0} />
          <p className="text-3xl font-bold text-gray-900 mt-4">{formatCurrency(product.price)}</p>
          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

          <div className="flex gap-4 mt-8">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => dispatch(addToCart(product))}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => dispatch(addToWishlist(product))}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Availability</span>
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Category</span>
              <span>{product.category || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <ReviewList reviews={product.reviews || []} />
      </section>
    </div>
  )
}

export default ProductDetails
