import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import AdminTable from '@/components/admin/AdminTable'
import AdminPagination from '@/components/admin/AdminPagination'
import AdminLoading from '@/components/admin/AdminLoading'
import AdminError from '@/components/admin/AdminError'
import AdminEmptyState from '@/components/admin/AdminEmptyState'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import StatusBadge from '@/components/admin/StatusBadge'
import Input from '@/components/common/Input'
import ProductImage from '@/components/common/ProductImage'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const PAGE_SIZE = 10

const AdminProducts = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [productToDelete, setProductToDelete] = useState(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  })

  const hasActiveFilters = Boolean(debouncedSearch) || Boolean(selectedCategory)

  const params = {
    _page: page,
    _limit: PAGE_SIZE,
    _sort: 'createdAt',
    _order: 'desc',
    ...(debouncedSearch ? { q: debouncedSearch } : {}),
    ...(selectedCategory ? { categoryId: Number(selectedCategory) } : {}),
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-products', page, PAGE_SIZE, debouncedSearch, selectedCategory],
    queryFn: () => productService.getAll(params),
  })

  const [lastFilterKey, setLastFilterKey] = useState('')
  const filterKey = `${debouncedSearch}::${selectedCategory}`

  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey)
    if (page > 1) setPage(1)
  }

  const prefetchProduct = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['admin-product', id],
      queryFn: () => productService.getById(id),
    })
  }

  const deleteMutation = useMutation({
    mutationFn: (id) => productService.delete(id),

    onSuccess: async (_deleted, id) => {
      if (page > 1 && data?.items?.length === 1) {
        setPage((prev) => prev - 1)
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin-products'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin-product', id],
        }),
      ])

      setProductToDelete(null)
      toast.success('Product deleted successfully')
    },

    onError: () => {
      toast.error('Failed to delete product. Please try again.')
    },
  })

  const handleDelete = (product) => {
    setProductToDelete(product)
  }

  const handleConfirmDelete = () => {
    if (!productToDelete) return
    deleteMutation.mutate(productToDelete.id)
  }

  const handleClearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setPage(1)
  }

  const products = data?.items
  const totalPages = data?.totalCount
    ? Math.max(1, Math.ceil(data.totalCount / PAGE_SIZE))
    : 1

  const columns = [
    {
      key: 'product',
      label: 'Product',
      render: (product) => (
        <div className="flex items-center gap-3">
          <ProductImage
            src={product.images?.[0]}
            alt={product.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="truncate font-medium text-surface-900 dark:text-surface-100">
              {product.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'brand',
      label: 'Brand',
      render: (product) => product.brand || '—',
    },
    {
      key: 'sku',
      label: 'SKU',
      render: (product) => product.sku || '—',
    },
    {
      key: 'category',
      label: 'Category',
      render: (product) => product.category || '—',
    },
    {
      key: 'price',
      label: 'Price',
      render: (product) => formatCurrency(product.price),
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (product) => product.stock,
    },
    {
      key: 'status',
      label: 'Status',
      render: (product) => (
        <StatusBadge status={product.isActive ? 'active' : 'inactive'} />
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (product) => formatDate(product.createdAt),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (product) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/admin/products/${product.id}/edit`)}
            onMouseEnter={() => prefetchProduct(product.id)}
            onFocus={() => prefetchProduct(product.id)}
            aria-label={`Edit ${product.name}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-700 transition-colors hover:bg-surface-50 hover:border-surface-300 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(product)}
            aria-label={`Delete ${product.name}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:bg-surface-900 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white">Products</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Manage your DevTech product catalog.
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 sm:self-center"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:w-80">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by category"
          className="h-11 w-full rounded-lg border border-surface-200 bg-white px-3.5 text-sm text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/60 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 sm:w-56"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <AdminLoading message="Loading Products..." />}

      {isError && (
        <AdminError message="Unable to load products." onRetry={refetch} />
      )}

      {!isLoading && !isError && products?.length === 0 && (
        hasActiveFilters ? (
          <AdminEmptyState
            title="No products found"
            description="There are no products matching your current filters."
            actionLabel="Clear Filters"
            onAction={handleClearFilters}
          />
        ) : (
          <AdminEmptyState
            title="No products found"
            description="Get started by adding your first product."
            actionLabel="Add Product"
            onAction={() => navigate('/admin/products/new')}
          />
        )
      )}

      {!isLoading && !isError && products?.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800">
          <AdminTable columns={columns} data={products} />
          <AdminPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <ConfirmDialog
        isOpen={!!productToDelete}
        title="Delete Product"
        message={
          productToDelete
            ? `Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
        loading={deleteMutation.isPending}
      />
    </div>
  )
}

export default AdminProducts