import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Eye, Package } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { userService } from '@/services/userService'
import AdminTable from '@/components/admin/AdminTable'
import AdminLoading from '@/components/admin/AdminLoading'
import AdminError from '@/components/admin/AdminError'
import AdminEmptyState from '@/components/admin/AdminEmptyState'
import OrderStatusBadge from '@/components/order/OrderStatusBadge'
import Badge from '@/components/common/Badge'
import Input from '@/components/common/Input'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import {
  getPaymentMethodLabel,
  getPaymentStatusLabel,
} from '@/utils/orderDisplay'

const getUserName = (user) => user?.name || user?.fullName || user?.username || null

const getCustomerName = (order, userMap) => {
  const user = userMap?.get(String(order?.userId ?? ''))
  const userName = user ? getUserName(user) : null
  if (userName) return userName
  if (order?.shippingAddress?.fullName) return order.shippingAddress.fullName
  return order?.userId != null ? `User #${order.userId}` : 'Guest'
}

const getPaymentStatusVariant = (status) => {
  const key = String(status || '').toLowerCase()
  if (key === 'paid') return 'success'
  if (key === 'pending') return 'warning'
  if (key === 'failed' || key === 'refunded') return 'danger'
  return 'default'
}

const AdminOrders = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const hasSearch = Boolean(debouncedSearch)

  const prefetchOrder = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['admin-order', id],
      queryFn: () => orderService.getById(id),
    })
  }

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: debouncedSearch
      ? ['admin-orders', debouncedSearch]
      : ['admin-orders'],
    queryFn: debouncedSearch
      ? () => orderService.getAll({ q: debouncedSearch })
      : orderService.getAll,
  })

  const { data: userData } = useQuery({
    queryKey: ['admin-users'],
    queryFn: userService.getAll,
  })

  const users = userData?.items ?? []

  const userMap = new Map((users || []).map((user) => [String(user.id), user]))

  const columns = [
    {
      key: 'order',
      label: 'Order ID',
      render: (order) => (
        <span className="font-medium text-surface-900 dark:text-surface-100">
          {order.orderNumber || `#${order.id}`}
        </span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (order) => (
        <span className="text-surface-900 dark:text-surface-100">
          {getCustomerName(order, userMap)}
        </span>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (order) => {
        const date = order.createdAt || order.date
        return date ? formatDate(date) : '—'
      },
    },
    {
      key: 'items',
      label: 'Items',
      render: (order) => order.items?.length || 0,
    },
    {
      key: 'total',
      label: 'Total',
      render: (order) => formatCurrency(order.total ?? order.totalAmount ?? 0),
    },
    {
      key: 'paymentMethod',
      label: 'Payment',
      render: (order) => getPaymentMethodLabel(order.paymentMethod),
    },
    {
      key: 'paymentStatus',
      label: 'Payment Status',
      render: (order) => (
        <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>
          {getPaymentStatusLabel(order.paymentStatus)}
        </Badge>
      ),
    },
    {
      key: 'orderStatus',
      label: 'Status',
      render: (order) => <OrderStatusBadge order={order} />,
    },
    {
      key: 'actions',
      label: 'Action',
      render: (order) => (
        <button
          type="button"
          onClick={() => navigate(`/admin/orders/${order.id}`)}
          onMouseEnter={() => prefetchOrder(order.id)}
          onFocus={() => prefetchOrder(order.id)}
          aria-label={`View order ${order.orderNumber || order.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-700 transition-colors hover:bg-surface-50 hover:border-surface-300 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Orders</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Track and manage customer orders.
          </p>
        </div>
        <div className="sm:w-80">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
          />
        </div>
      </div>

      {isLoading && <AdminLoading message="Loading Orders..." />}

      {isError && (
        <AdminError message="Unable to load orders." onRetry={refetch} />
      )}

      {!isLoading && !isError && orders.length === 0 && (
        hasSearch ? (
          <AdminEmptyState
            title="No orders match your search."
            description="Try a different search term."
            actionLabel="Clear Search"
            onAction={() => setSearch('')}
          />
        ) : (
          <AdminEmptyState
            title="No orders found"
            description="There are no orders yet."
            icon={Package}
          />
        )
      )}

      {!isLoading && !isError && orders.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800">
          <AdminTable columns={columns} data={orders} />
        </div>
      )}
    </div>
  )
}

export default AdminOrders