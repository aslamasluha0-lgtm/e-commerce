import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, Loader2 } from 'lucide-react'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'
import ProductSort from '@/components/product/ProductSort'
import ProductSearch from '@/components/product/ProductSearch'
import Pagination from '@/components/common/Pagination'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useProducts } from '@/hooks/useProducts'
import { useDebounce } from '@/hooks/useDebounce'
import { categoryService } from '@/services/categoryService'
import { useQuery } from '@tanstack/react-query'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const [priceMax, setPriceMax] = useState(200000)
  const [filterOpen, setFilterOpen] = useState(false)
  const searchQuery = searchParams.get('q') || ''
  const debouncedSearch = useDebounce(searchQuery)
  const categoryId = searchParams.get('category') || ''

  const params = {
    _page: page,
    _limit: 12,
    ...(debouncedSearch && { q: debouncedSearch }),
    ...(categoryId && { categoryId }),
    ...(priceMax < 200000 && { price_lte: priceMax }),
  }

  const sortField = sortBy.replace('_asc', '').replace('_desc', '')
  if (sortBy !== 'newest') {
    params._sort = sortField
    params._order = sortBy.includes('_desc') ? 'desc' : 'asc'
  }

  const { data, isLoading, isFetching, isError, refetch } = useProducts(params)
  const products = data?.items
  const totalCount = data?.totalCount

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
    setPage(1)
  }

  const handleCategoryChange = (id) => {
    const params = new URLSearchParams(searchParams)
    if (id) {
      params.set('category', id)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
    setPage(1)
  }

  const handlePriceChange = (value) => {
    setPriceMax(value)
    setPage(1)
  }

  const hasActiveFilters = Boolean(debouncedSearch) || Boolean(categoryId) || priceMax < 200000

  const clearFilters = () => {
    setSearchParams(new URLSearchParams())
    setPriceMax(200000)
    setPage(1)
  }

  const filterContent = (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
          Filters
        </h2>
        <button
          onClick={() => setFilterOpen(false)}
          aria-label="Close filters"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-500 hover:bg-surface-100 lg:hidden dark:text-surface-400 dark:hover:bg-surface-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <ProductFilter
        categories={categories}
        selectedCategory={categoryId}
        onCategoryChange={handleCategoryChange}
        maxPrice={priceMax}
        onMaxPriceChange={handlePriceChange}
      />
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="mt-6 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl dark:text-surface-50">
          Products
        </h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Explore our curated catalog of premium developer gear.
        </p>
      </div>

      <ProductSearch value={searchQuery} onChange={handleSearch} className="mb-6" />

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-24 rounded-2xl border border-surface-200 bg-white p-5 dark:border-surface-800 dark:bg-surface-900">
            {filterContent}
          </div>
        </aside>

        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-surface-200 bg-white px-4 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-100 lg:hidden dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
                    !
                  </span>
                )}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="hidden lg:inline-flex text-sm font-medium text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Showing{' '}
                <span className="font-semibold text-surface-900 dark:text-surface-100">
                  {totalCount ?? products?.length ?? 0}
                </span>{' '}
                products
                {debouncedSearch && (
                  <>
                    {' '}
                    for "<span className="font-medium text-brand-600 dark:text-brand-400">
                      {debouncedSearch}
                    </span>"
                  </>
                )}
                {isFetching && !isLoading && (
                  <Loader2 className="ml-2 inline h-3.5 w-3.5 animate-spin text-surface-400 dark:text-surface-500" />
                )}
              </p>
              <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
            </div>
          </div>

          <ProductGrid
            products={products}
            loading={isLoading}
            skeletonCount={12}
            emptyMessage={
              debouncedSearch
                ? `No products found for "${debouncedSearch}"`
                : 'No products found'
            }
            emptyDescription={
              debouncedSearch
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'Try adjusting your filters to find what you\'re looking for.'
            }
          />

          {isError && (
            <ErrorMessage
              message="We couldn't load the products. Please try again."
              onRetry={refetch}
            />
          )}

          {!isError && (
            <Pagination
              currentPage={page}
              totalPages={totalCount ? Math.ceil(totalCount / 12) : 1}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] overflow-y-auto bg-surface-50 p-5 shadow-soft-lg animate-slide-in-right dark:bg-surface-900">
            {filterContent}
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
