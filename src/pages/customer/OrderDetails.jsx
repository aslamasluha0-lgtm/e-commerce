import { Link, useNavigate, useParams } from 'react-router-dom'
import OrderStatusBadge from '@/components/order/OrderStatusBadge'
import { useOrder } from '@/hooks/useOrders'
import { useProducts } from '@/hooks/useProducts'
import { useAuth } from '@/hooks/useAuth'
import ProductImage from '@/components/common/ProductImage'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import {
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  isRazorpayOrder,
} from '@/utils/orderDisplay'
import { ArrowLeft, Package, ShoppingCart } from 'lucide-react'

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

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: order, isLoading } = useOrder(id)
  const { data: productData } = useProducts()
  const products = productData?.items

  const productMap = new Map(
    (products || []).map((p) => [String(p.id), p])
  )

  if (isLoading) {
    return (
      <div className="animate-pulse mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-6 w-40 rounded bg-surface-200 dark:bg-surface-700" />
        <div className="space-y-4">
          <div className="h-32 rounded-2xl bg-surface-200 dark:bg-surface-700" />
          <div className="h-48 rounded-2xl bg-surface-200 dark:bg-surface-700" />
          <div className="h-32 rounded-2xl bg-surface-200 dark:bg-surface-700" />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Package className="mx-auto h-12 w-12 text-surface-300 dark:text-surface-600" />
        <h1 className="mt-4 text-2xl font-bold text-surface-900 dark:text-surface-50">
          Order not found
        </h1>
        <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
          This order could not be found, or you are not authorized to view it.
        </p>
        <Link
          to="/account/orders"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Orders
        </Link>
      </div>
    )
  }

  if (String(order.userId ?? '') !== String(user?.id ?? '')) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Package className="mx-auto h-12 w-12 text-surface-300 dark:text-surface-600" />
        <h1 className="mt-4 text-2xl font-bold text-surface-900 dark:text-surface-50">
          You are not authorized to view this order
        </h1>
        <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
          This order belongs to another account.
        </p>
        <Link
          to="/account/orders"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Orders
        </Link>
      </div>
    )
  }

  const items = enrichOrderItems(order.items, productMap)
  const address = order.shippingAddress || {}
  const orderDate = order.createdAt || order.date
  const orderNumber = order.orderNumber || order.id
  const total = order.total ?? order.totalAmount ?? 0
  const isRazorpay = isRazorpayOrder(order)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-surface-600 transition-colors hover:text-brand-700 dark:text-surface-300 dark:hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Orders
      </button>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
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

      <div className="mt-6 rounded-2xl border border-surface-200 bg-white p-6 shadow-soft dark:border-surface-800 dark:bg-surface-900">
        <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-100">
          Products
        </h2>
        <div className="divide-y divide-surface-100 dark:divide-surface-800">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-4">
              <ProductImage
                src={item.image}
                alt={item.name}
                className="h-16 w-16 flex-shrink-0 rounded-lg border border-surface-100 object-cover dark:border-surface-800"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-surface-900 dark:text-surface-100">
                  {item.name}
                </p>
                <p className="mt-0.5 text-sm text-surface-500 dark:text-surface-400">
                  {formatCurrency(item.price)} × {item.quantity}
                </p>
              </div>
              <p className="flex-shrink-0 font-semibold text-surface-900 dark:text-surface-100">
                {formatCurrency((item.price || 0) * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2 space-y-2 border-t border-surface-100 pt-4 dark:border-surface-800">
          <PriceRow label="Subtotal" value={order.subtotal ?? 0} />
          {order.discount > 0 && (
            <PriceRow label="Discount" value={order.discount ?? 0} negative />
          )}
          <PriceRow
            label="Shipping"
            value={order.shipping ?? 0}
            free={!order.shipping}
          />
          {typeof order.tax === 'number' && <PriceRow label="Tax" value={order.tax} />}
          <div className="border-t border-surface-100 pt-3 dark:border-surface-800" />
          <PriceRow label="Total" value={total} strong />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-soft dark:border-surface-800 dark:bg-surface-900">
          <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-100">
            Shipping Address
          </h2>
          <div className="space-y-1 text-sm text-surface-700 dark:text-surface-300">
            <p className="font-medium text-surface-900 dark:text-surface-100">
              {address.fullName || 'N/A'}
            </p>
            {address.phone && <p>{address.phone}</p>}
            <p>{(address.addressLine1 || '') + (address.addressLine2 ? `, ${address.addressLine2}` : '') || 'N/A'}</p>
            <p>
              {[address.city, address.state].filter(Boolean).join(', ')}
              {address.postalCode ? ` - ${address.postalCode}` : ''}
            </p>
            {address.country && <p>{address.country}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-soft dark:border-surface-800 dark:bg-surface-900">
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
              <dd
                className={`font-medium ${
                  order.paymentStatus === 'paid'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {getPaymentStatusLabel(order.paymentStatus)}
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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-700"
        >
          <ShoppingCart className="h-4 w-4" />
          Continue Shopping
        </Link>
        <Link
          to="/account/orders"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-surface-200 bg-white px-6 py-3 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
        >
          <ArrowLeft className="h-4 w-4" />
          View All Orders
        </Link>
      </div>
    </div>
  )
}

export default OrderDetails
