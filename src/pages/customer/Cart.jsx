import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import EmptyCart from '@/components/cart/EmptyCart'

const Cart = () => {
  const { items } = useSelector((state) => state.cart)

  if (!items.length) return <EmptyCart />

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl dark:text-surface-50">
        Shopping Cart
      </h1>
      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
        {items.reduce((n, i) => n + i.quantity, 0)} item
        {items.reduce((n, i) => n + i.quantity, 0) !== 1 ? 's' : ''} in your cart
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

export default Cart
