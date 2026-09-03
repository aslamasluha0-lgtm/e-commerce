import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2, PackageCheck, CreditCard, CalendarDays } from 'lucide-react'
import Button from '@/components/common/Button'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const OrderSuccess = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const order = state?.order

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
          No recent order found
        </h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          Head to your orders or keep shopping.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={() => navigate('/orders')}>
            View My Orders
          </Button>
          <Link to="/products">
            <Button size="lg" variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const paid = order.paymentStatus === 'paid'

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-surface-200 bg-white p-8 text-center shadow-soft dark:border-surface-800 dark:bg-surface-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
          <CheckCircle2 className="h-9 w-9" />
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl dark:text-surface-50">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          Thank you for shopping with DevTech. We have received your order.
        </p>

        <div className="mt-8 space-y-4 rounded-2xl border border-surface-200 bg-surface-50 p-6 text-left dark:border-surface-800 dark:bg-surface-900/50">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
              <PackageCheck className="h-4 w-4" />
              Order ID
            </span>
            <span className="text-sm font-semibold text-surface-900 dark:text-surface-100">
              {order.orderNumber || `DEV-${order.id}`}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
              <CreditCard className="h-4 w-4" />
              Payment
            </span>
            <span
              className={`text-sm font-semibold ${
                paid
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {paid ? 'Successful' : 'Pending'}
            </span>
          </div>

          {order.paymentId && (
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                <CreditCard className="h-4 w-4" />
                Payment ID
              </span>
              <span className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                {order.paymentId}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
              <CalendarDays className="h-4 w-4" />
              Date
            </span>
            <span className="text-sm font-semibold text-surface-900 dark:text-surface-100">
              {formatDate(order.date || order.createdAt)}
            </span>
          </div>

          <div className="!mt-6 flex items-center justify-between gap-3 border-t border-surface-200 pt-4 dark:border-surface-800">
            <span className="text-base font-semibold text-surface-900 dark:text-surface-100">
              Total
            </span>
            <span className="text-xl font-bold text-surface-900 dark:text-surface-100">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={() => navigate(`/account/orders/${order.id}`)}>
            View Order
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/account/orders')}>
            View My Orders
          </Button>
          <Link to="/products">
            <Button size="lg" variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
