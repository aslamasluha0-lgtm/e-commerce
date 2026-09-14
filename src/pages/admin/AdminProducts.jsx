import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import AdminTable from '@/components/admin/AdminTable'
import AdminPagination from '@/components/admin/AdminPagination'
import StatusBadge from '@/components/admin/StatusBadge'
import EmptyState from '@/components/common/EmptyState'
import ErrorMessage from '@/components/common/ErrorMessage'
import Skeleton from '@/components/common/Skeleton'
import ProductImage from '@/components/common/ProductImage'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const PAGE_SIZE = 10

const AdminProducts = () => {
  const [page, setPage] = useState(1)

  const params = {
    _page: page,
    _limit: PAGE_SIZE,
    _sort: 'createdAt',
    _order: 'desc',
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-products', params],
    queryFn: () => productService.getAll(params),
  })

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
            {product.sku && (
              <p className="text-xs text-surface-500 dark:text-surface-400">{product.sku}</p>
            )}
          </div>
        </div>
      ),
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
  ]

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Products</h1>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <ErrorMessage
          message="We couldn't load the products list."
          onRetry={refetch}
        />
      )}

      {!isLoading && !isError && products?.length === 0 && (
        <EmptyState
          title="No products found"
          description="Get started by adding your first product."
          action={
            <Link
              to="/admin/products/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          }
        />
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
    </div>
  )
}

export default AdminProducts