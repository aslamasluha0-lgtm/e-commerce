import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { formatCurrency } from '@/utils/formatCurrency'
import { calculateTotals } from '@/utils/checkoutCalculations'
import Button from '@/components/common/Button'

const CartSummary = () => {
  const { items } = useSelector((state) => state.cart)

  const { subtotal, shipping, tax, total } = calculateTotals(items)
  const totalQuantity = items.reduce((n, i) => n + i.quantity, 0)

  return (
    <div className="lg:sticky lg:top-24 rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-brand-600 dark:text-brand-400" />
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
          Order Summary
        </h3>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-surface-500 dark:text-surface-400">
            Subtotal ({totalQuantity} items)
          </span>
          <span className="font-medium text-surface-900 dark:text-surface-100">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-surface-500 dark:text-surface-400">Shipping</span>
          <span
            className={shipping === 0 ? 'font-medium text-emerald-600 dark:text-emerald-400' : 'font-medium text-surface-900 dark:text-surface-100'}
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

        <div className="border-t border-surface-200 pt-3 dark:border-surface-800">
          <div className="flex justify-between text-base font-semibold">
            <span className="text-surface-900 dark:text-surface-100">Total</span>
            <span className="text-surface-900 dark:text-surface-100">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <Link to="/checkout" className="mt-5 block">
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </Link>

      <p className="mt-4 text-center text-xs text-surface-400 dark:text-surface-500">
        Shipping &amp; taxes calculated at checkout.
      </p>
    </div>
  )
}

export default CartSummary
