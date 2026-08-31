import { useSelector } from 'react-redux'
import { formatCurrency } from '@/utils/formatCurrency'
import Button from '@/components/common/Button'

const CartSummary = () => {
  const { items } = useSelector((state) => state.cart)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 49
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({items.length} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (18% GST)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <Button className="w-full mt-4">Proceed to Checkout</Button>
    </div>
  )
}

export default CartSummary
