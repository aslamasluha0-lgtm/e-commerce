import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import EmptyCart from '@/components/cart/EmptyCart'

const Cart = () => {
  const { items } = useSelector((state) => state.cart)

  if (!items.length) return <EmptyCart />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Link to="/products" className="text-blue-600 hover:underline mt-4 inline-block">
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
