import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Eye, Package } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { userService } from '@/services/userService'
import AdminTable from '@/components/admin/AdminTable'
import OrderStatusBadge from '@/components/order/OrderStatusBadge'
import Badge from '@/components/common/Badge'
import EmptyState from '@/components/common/EmptyState'
import ErrorMessage from '@/components/common/ErrorMessage'
import Skeleton from '@/components/common/Skeleton'
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

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: orderService.getAll,
  })

  const { data: users = [] } = useQuery({
    queryKey: ['admin-users'],
    queryFn: userService.getAll,
  })

  const userMap = new Map((users || []).map((user) => [String(user.id), user]))

  const columns = [
    {
      key: 'order',
      label: 'Order',
      render: (order) => (
        <div>
          <p className="font-medium text-surface-900 dark:text-surface-100">
            {order.orderNumber || `#${order.id}`}
          </p>
          <p className="text-xs text-surface-500 dark:text-surface-400">
            {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>
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
      key: 'total',
      label: 'Total',
      render: (order) => formatCurrency(order.total ?? order.totalAmount ?? 0),
    },
    {
      key: 'paymentMethod',
      label: 'Payment Method',
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
      label: 'Order Status',
      render: (order) => <OrderStatusBadge order={order} />,
    },
    {
      key: 'actions',
      label: 'Action',
      render: (order) => (
        <button
          type="button"
          onClick={() => navigate(`/admin/orders/${order.id}`)}
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Orders</h1>
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
          message="Unable to load orders."
          onRetry={refetch}
        />
      )}

      {!isLoading && !isError && orders.length === 0 && (
        <EmptyState
          title="No orders found"
          description="There are no orders yet."
          icon={Package}
        />
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