import { Link } from 'react-router-dom'
import ProductImage from '@/components/common/ProductImage'
import OrderStatusBadge from '@/components/order/OrderStatusBadge'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import {
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  isRazorpayOrder,
} from '@/utils/orderDisplay'

const OrderCard = ({ order }) => {
  const orderDate = order.createdAt || order.date
  const orderId = order.orderNumber || order.id
  const total = order.total ?? order.totalAmount ?? 0
  const paymentStatus = order.paymentStatus
  const method = getPaymentMethodLabel(order.paymentMethod)
  const isPaid = paymentStatus === 'paid'
  const extraCount = (order.items?.length || 0) - 3

  return (
    <Link
      to={`/account/orders/${order.id}`}
      className="group block rounded-2xl border border-surface-200 bg-white p-5 shadow-soft transition-all duration-200 hover:shadow-soft-md hover:border-brand-200 focus-within:ring-2 focus-within:ring-brand-500/30 dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-800"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
            Order #{orderId}
          </p>
          {orderDate && (
            <p className="mt-0.5 text-xs text-surface-500 dark:text-surface-400">
              Placed on {formatDate(orderDate)}
            </p>
          )}
        </div>
        <OrderStatusBadge order={order} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        {order.items?.slice(0, 3).map((item, i) => (
          <ProductImage
            key={i}
            src={item.image}
            alt={item.name || `Product ${item.productId}`}
            className="h-14 w-14 rounded-lg border border-surface-100 object-cover dark:border-surface-800"
          />
        ))}
        {extraCount > 0 && (
          <span className="text-xs font-medium text-surface-500 dark:text-surface-400">
            +{extraCount} more
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-surface-600 dark:text-surface-300">
            {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-surface-500 dark:text-surface-400">{method}</span>
            {paymentStatus && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ring-1 ring-inset ${
                  isPaid
                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800'
                    : 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800'
                }`}
              >
                {getPaymentStatusLabel(paymentStatus)}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-bold text-surface-900 dark:text-surface-100">
            {formatCurrency(total)}
          </p>
          {isRazorpayOrder(order) && order.paymentId && (
            <p className="mt-0.5 max-w-[150px] truncate text-xs text-surface-400 dark:text-surface-500">
              {order.paymentId}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 border-t border-surface-100 pt-3 dark:border-surface-800">
        <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700 dark:text-brand-400 dark:group-hover:text-brand-300">
          View Order Details →
        </span>
      </div>
    </Link>
  )
}

export default OrderCard
