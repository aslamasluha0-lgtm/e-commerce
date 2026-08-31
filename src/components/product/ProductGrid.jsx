import ProductCard from './ProductCard'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'

const ProductGrid = ({ products, loading, emptyMessage = 'No products found' }) => {
  if (loading) return <Loader />

  if (!products?.length) {
    return <EmptyState title={emptyMessage} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
