import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { ArrowLeft, Loader2, Package } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { userService } from '@/services/userService'
import { useProducts } from '@/hooks/useProducts'
import StatusBadge from '@/components/admin/StatusBadge'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import AdminLoading from '@/components/admin/AdminLoading'
import AdminError from '@/components/admin/AdminError'
import AdminEmptyState from '@/components/admin/AdminEmptyState'
import Badge from '@/components/common/Badge'
import ProductImage from '@/components/common/ProductImage'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import {
  getOrderStatus,
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  isRazorpayOrder,
  ORDER_STATUS_LABELS,
} from '@/utils/orderDisplay'

const ORDER_STATUSES = Object.keys(ORDER_STATUS_LABELS)

const enrichOrderItems = (items, productMap) =>
  (items || []).map((item) => {
    const product = productMap?.get(String(item.productId ?? item.id ?? ''))
    return {
      ...item,
      name: item.name || product?.name || `Product #${item.productId ?? item.id}`,
      image: item.image || product?.images?.[0] || product?.image,
      price: typeof item.price === 'number' ? item.price : product?.price ?? 0,
    }
  })

const getPaymentStatusVariant = (status) => {
  const key = String(status || '').toLowerCase()
  if (key === 'paid') return 'success'
  if (key === 'pending') return 'warning'
  if (key === 'failed' || key === 'refunded') return 'danger'
  return 'default'
}

const PriceRow = ({ label, value, strong = false, negative = false, free = false }) => (
  <div
    className={`flex items-center justify-between ${
      strong ? 'pt-3 text-base font-semibold' : 'text-sm'
    }`}
  >
    <span className={strong ? '' : 'text-surface-500 dark:text-surface-400'}>{label}</span>
    <span
      className={
        free
          ? 'font-medium text-emerald-600 dark:text-emerald-400'
          : negative
            ? 'font-medium text-emerald-600 dark:text-emerald-400'
            : 'text-surface-900 dark:text-surface-100'
      }
    >
      {negative ? '-' : ''}
      {free ? 'Free' : formatCurrency(value)}
    </span>
  </div>
)

const BackLink = () => (
  <Link
    to="/admin/orders"
    className="inline-flex items-center gap-2 rounded-lg border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
  >
    <ArrowLeft className="h-4 w-4" />
    Back to Orders
  </Link>
)

const AdminOrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const updateStatusMutation = useMutation({
    mutationFn: (status) => orderService.updateStatus(id, status),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin-orders'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin-order', id],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin-dashboard-orders'],
        }),
      ])

      toast.success('Order status updated successfully')
    },

    onError: () => {
      toast.error('Failed to update order status')
    },
  })

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['admin-order', id],
    queryFn: () =>
      orderService.getById(id).catch((error) => {
        if (error.response?.status === 404) return null
        throw error
      }),
    enabled: Boolean(id),
  })

  const [selectedStatus, setSelectedStatus] = useState('')
  const [syncedOrderId, setSyncedOrderId] = useState(null)
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false)

  if (order && String(order.id) !== syncedOrderId) {
    setSyncedOrderId(String(order.id))
    setSelectedStatus(getOrderStatus(order))
  }

  const handleSaveStatus = () => {
    if (selectedStatus === 'cancelled') {
      setConfirmCancelOpen(true)
      return
    }
    updateStatusMutation.mutate(selectedStatus)
  }

  const { data: userData } = useQuery({
    queryKey: ['admin-users'],
    queryFn: userService.getAll,
  })

  const { data: productData } = useProducts()
  const products = productData?.items

  const users = userData?.items ?? []

  const userMap = new Map((users || []).map((user) => [String(user.id), user]))
  const productMap = new Map((products || []).map((p) => [String(p.id), p]))

  if (isLoading) {
    return (
      <div className="p-6">
        <AdminLoading message="Loading Order..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6">
        <AdminError message="Unable to load order." onRetry={refetch} />
        <div className="mt-4 flex justify-center">
          <BackLink />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-6">
        <AdminEmptyState
          title="Order not found"
          description="This order could not be found."
          icon={Package}
          actionLabel="Back to Orders"
          onAction={() => navigate('/admin/orders')}
        />
      </div>
    )
  }

  const orderNumber = order.orderNumber || order.id
  const orderDate = order.createdAt || order.date
  const items = enrichOrderItems(order.items, productMap)
  const address = order.shippingAddress || {}
  const total = order.total ?? order.totalAmount ?? 0
  const isRazorpay = isRazorpayOrder(order)
  const currentStatus = getOrderStatus(order)

  const customer = userMap.get(String(order.userId ?? ''))
  const customerName = customer
    ? customer.name || customer.fullName || customer.username
    : address.fullName || (order.userId != null ? `User #${order.userId}` : 'Guest')
  const customerEmail = customer?.email
  const customerPhone = customer?.phone || address.phone

  return (
    <div className="p-6">
      <div className="mb-6">
        <BackLink />
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            Order #{orderNumber}
          </h1>
          {orderDate && (
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Placed on {formatDate(orderDate)}
            </p>
          )}
        </div>
        <StatusBadge status={currentStatus} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
          <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-100">
            Order Information
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-surface-500 dark:text-surface-400">Order ID</dt>
              <dd className="font-medium text-surface-900 dark:text-surface-100">{order.id}</dd>
            </div>
            {order.orderNumber && order.orderNumber !== order.id && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-surface-500 dark:text-surface-400">Order Number</dt>
                <dd className="text-right font-medium text-surface-900 dark:text-surface-100">
                  {order.orderNumber}
                </dd>
              </div>
            )}
            <div className="flex items-center justify-between gap-3">
              <dt className="text-surface-500 dark:text-surface-400">Order Date</dt>
              <dd className="text-right font-medium text-surface-900 dark:text-surface-100">
                {orderDate ? formatDate(orderDate) : '—'}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-surface-500 dark:text-surface-400">Order Status</dt>
              <dd>
                <StatusBadge status={currentStatus} />
              </dd>
            </div>
          </dl>

          <div className="mt-4 border-t border-surface-100 pt-4 dark:border-surface-800">
            <label
              htmlFor="order-status"
              className="mb-2 block text-sm font-medium text-surface-900 dark:text-surface-100"
            >
              Update Status
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <select
                id="order-status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-11 min-w-[180px] flex-1 rounded-xl border border-surface-200 bg-white px-3.5 text-sm text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/60 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {ORDER_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleSaveStatus}
                disabled={
                  updateStatusMutation.isPending ||
                  selectedStatus === currentStatus
                }
                aria-busy={updateStatusMutation.isPending || undefined}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Loader2 className={`h-4 w-4 animate-spin ${updateStatusMutation.isPending ? '' : 'hidden'}`} />
                {updateStatusMutation.isPending ? 'Updating...' : 'Save Status'}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
          <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-100">
            Customer
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-surface-500 dark:text-surface-400">Customer Name</dt>
              <dd className="font-medium text-surface-900 dark:text-surface-100">
                {customerName || '—'}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-surface-500 dark:text-surface-400">Customer Email</dt>
              <dd className="max-w-[60%] truncate text-right font-medium text-surface-900 dark:text-surface-100">
                {customerEmail || '—'}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-surface-500 dark:text-surface-400">Customer Phone</dt>
              <dd className="font-medium text-surface-900 dark:text-surface-100">
                {customerPhone || '—'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
        <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-100">
          Products
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200 text-left text-xs font-medium uppercase tracking-wider text-surface-500 dark:border-surface-700 dark:text-surface-400">
                <th className="py-2 pr-4">Product</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 flex-shrink-0 rounded-lg border border-surface-100 object-cover dark:border-surface-800"
                      />
                      <span className="font-medium text-surface-900 dark:text-surface-100">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 pr-4 text-surface-700 dark:text-surface-300">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="whitespace-nowrap py-4 pr-4 text-surface-700 dark:text-surface-300">
                    {item.quantity}
                  </td>
                  <td className="whitespace-nowrap py-4 text-right font-semibold text-surface-900 dark:text-surface-100">
                    {formatCurrency((item.price || 0) * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 space-y-2 border-t border-surface-100 pt-4 dark:border-surface-800">
          <PriceRow label="Subtotal" value={order.subtotal ?? 0} />
          {order.discount > 0 && (
            <PriceRow label="Discount" value={order.discount ?? 0} negative />
          )}
          <PriceRow label="Shipping" value={order.shipping ?? 0} free={!order.shipping} />
          {typeof order.tax === 'number' && <PriceRow label="Tax" value={order.tax} />}
          <div className="border-t border-surface-100 pt-3 dark:border-surface-800" />
          <PriceRow label="Total" value={total} strong />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
          <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-100">
            Shipping Address
          </h2>
          <div className="space-y-1 text-sm text-surface-700 dark:text-surface-300">
            <p className="font-medium text-surface-900 dark:text-surface-100">
              {address.fullName || 'N/A'}
            </p>
            {address.phone && <p>{address.phone}</p>}
            <p>
              {(address.addressLine1 || '') +
                (address.addressLine2 ? `, ${address.addressLine2}` : '') || 'N/A'}
            </p>
            <p>
              {[address.city, address.state].filter(Boolean).join(', ')}
              {address.postalCode ? ` - ${address.postalCode}` : ''}
            </p>
            {address.country && <p>{address.country}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
          <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-100">
            Payment Information
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-surface-500 dark:text-surface-400">Method</dt>
              <dd className="font-medium text-surface-900 dark:text-surface-100">
                {getPaymentMethodLabel(order.paymentMethod)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-surface-500 dark:text-surface-400">Payment Status</dt>
              <dd>
                <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>
                  {getPaymentStatusLabel(order.paymentStatus)}
                </Badge>
              </dd>
            </div>
            {isRazorpay ? (
              <>
                {order.paymentId && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-surface-500 dark:text-surface-400">Payment ID</dt>
                    <dd className="max-w-[60%] truncate text-right font-medium text-surface-900 dark:text-surface-100">
                      {order.paymentId}
                    </dd>
                  </div>
                )}
                {order.razorpayOrderId && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-surface-500 dark:text-surface-400">Razorpay Order ID</dt>
                    <dd className="max-w-[60%] truncate text-right font-medium text-surface-900 dark:text-surface-100">
                      {order.razorpayOrderId}
                    </dd>
                  </div>
                )}
              </>
            ) : order.paymentMethod === 'cod' ? (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-surface-500 dark:text-surface-400">Amount to Pay on Delivery</dt>
                <dd className="font-semibold text-surface-900 dark:text-surface-100">
                  {formatCurrency(total)}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmCancelOpen}
        title="Cancel Order"
        message="Are you sure you want to cancel this order?"
        confirmLabel="Yes, Cancel Order"
        loadingLabel="Cancelling..."
        onCancel={() => setConfirmCancelOpen(false)}
        onConfirm={() => {
          setConfirmCancelOpen(false)
          updateStatusMutation.mutate(selectedStatus)
        }}
        loading={updateStatusMutation.isPending}
      />
    </div>
  )
}

export default AdminOrderDetails