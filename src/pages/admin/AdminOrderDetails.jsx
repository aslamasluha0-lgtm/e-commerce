import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Package } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { userService } from '@/services/userService'
import { useProducts } from '@/hooks/useProducts'
import OrderStatusBadge from '@/components/order/OrderStatusBadge'
import Badge from '@/components/common/Badge'
import EmptyState from '@/components/common/EmptyState'
import ErrorMessage from '@/components/common/ErrorMessage'
import Skeleton from '@/components/common/Skeleton'
import ProductImage from '@/components/common/ProductImage'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import {
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  isRazorpayOrder,
} from '@/utils/orderDisplay'

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

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['admin-order', id],
    queryFn: () => orderService.getById(id),
    enabled: Boolean(id),
  })

  const { data: users = [] } = useQuery({
    queryKey: ['admin-users'],
    queryFn: userService.getAll,
  })

  const { data: productData } = useProducts()
  const products = productData?.items

  const userMap = new Map((users || []).map((user) => [String(user.id), user]))
  const productMap = new Map((products || []).map((p) => [String(p.id), p]))

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4 text-surface-400 dark:text-surface-500" aria-hidden="true" />
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Loading order details...
          </p>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorMessage message="Unable to load this order." onRetry={refetch} />
        <div className="mt-4 flex justify-center">
          <BackLink />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-6">
        <EmptyState
          title="Order not found"
          description="This order could not be found."
          icon={Package}
          action={<BackLink />}
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

  const customer = userMap.get(String(order.userId ?? ''))
  const customerName = customer
    ? customer.name || customer.fullName || customer.username
    : address.fullName || (order.userId != null ? `User #${order.userId}` : 'Guest')
  const customerEmail = customer?.email

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
        <OrderStatusBadge order={order} size="lg" />
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
                <OrderStatusBadge order={order} />
              </dd>
            </div>
          </dl>
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
    </div>
  )
}

export default AdminOrderDetails