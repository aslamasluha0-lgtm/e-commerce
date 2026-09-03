import ProductCard from './ProductCard'
import ProductCardSkeleton from '@/components/common/Skeletons'
import EmptyState from '@/components/common/EmptyState'
import { PackageSearch } from 'lucide-react'

const ProductGrid = ({
  products,
  loading,
  emptyMessage = 'No products found',
  emptyDescription = 'Try adjusting your search or filters.',
  skeletonCount = 8,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return (
      <EmptyState
        title={emptyMessage}
        description={emptyDescription}
        icon={PackageSearch}
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
