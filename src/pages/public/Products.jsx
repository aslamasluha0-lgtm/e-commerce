import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'
import ProductSort from '@/components/product/ProductSort'
import ProductSearch from '@/components/product/ProductSearch'
import Pagination from '@/components/common/Pagination'
import { useProducts } from '@/hooks/useProducts'
import { useDebounce } from '@/hooks/useDebounce'
import { categoryService } from '@/services/categoryService'
import { useQuery } from '@tanstack/react-query'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const searchQuery = searchParams.get('q') || ''
  const debouncedSearch = useDebounce(searchQuery)
  const categoryId = searchParams.get('category') || ''

  const params = {
    _page: page,
    _limit: 12,
    ...(debouncedSearch && { q: debouncedSearch }),
    ...(categoryId && { categoryId }),
  }

  const sortField = sortBy.replace('_asc', '').replace('_desc', '')
  if (sortBy !== 'newest') {
    params._sort = sortField
    params._order = sortBy.includes('_desc') ? 'desc' : 'asc'
  }

  const { data: products, isLoading } = useProducts(params)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  })

  const handleSearch = (value) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    setSearchParams(params)
  }

  const handleCategoryChange = (id) => {
    const params = new URLSearchParams(searchParams)
    if (id) {
      params.set('category', id)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="mb-6">
        <ProductSearch value={searchQuery} onChange={handleSearch} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ProductFilter
            categories={categories}
            selectedCategory={categoryId}
            onCategoryChange={handleCategoryChange}
          />
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {products?.length || 0} products found
            </p>
            <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <ProductGrid products={products} loading={isLoading} />

          <Pagination
            currentPage={page}
            totalPages={Math.ceil((products?.length || 0) / 12)}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Products
