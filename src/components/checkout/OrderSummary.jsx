import { formatCurrency } from '@/utils/formatCurrency'
import ProductImage from '@/components/common/ProductImage'
import { calculateTotals } from '@/utils/checkoutCalculations'

const OrderSummary = ({ items = [], discount = 0, children }) => {
  const { subtotal, shipping, tax, total } = calculateTotals(items, discount)

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
        Order Summary
      </h3>

      {items.length > 0 && (
        <div className="mt-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <ProductImage
                src={item.image || item.images?.[0]}
                alt={item.name}
                className="h-14 w-14 flex-shrink-0 rounded-lg border border-surface-100 object-cover dark:border-surface-800"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-surface-900 dark:text-surface-100">
                  {item.name}
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  {formatCurrency(item.price)} × {item.quantity}
                </p>
              </div>
              <p className="flex-shrink-0 text-sm font-semibold text-surface-900 dark:text-surface-100">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2 border-t border-surface-200 pt-4 text-sm dark:border-surface-800">
        <div className="flex justify-between">
          <span className="text-surface-500 dark:text-surface-400">Subtotal</span>
          <span className="font-medium text-surface-900 dark:text-surface-100">
            {formatCurrency(subtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-surface-500 dark:text-surface-400">Discount</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              -{formatCurrency(discount)}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-surface-500 dark:text-surface-400">Shipping</span>
          <span
            className={
              shipping === 0
                ? 'font-medium text-emerald-600 dark:text-emerald-400'
                : 'font-medium text-surface-900 dark:text-surface-100'
            }
          >
            {shipping === 0 ? 'Free' : formatCurrency(shipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-surface-500 dark:text-surface-400">Tax (18% GST)</span>
          <span className="font-medium text-surface-900 dark:text-surface-100">
            {formatCurrency(tax)}
          </span>
        </div>
        <div className="flex justify-between border-t border-surface-200 pt-2 text-base font-semibold dark:border-surface-800">
          <span className="text-surface-900 dark:text-surface-100">Total</span>
          <span className="text-surface-900 dark:text-surface-100">{formatCurrency(total)}</span>
        </div>
      </div>

      {children}
    </div>
  )
}

export default OrderSummary
