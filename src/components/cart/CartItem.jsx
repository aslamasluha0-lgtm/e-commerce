import { Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/redux/slices/cartSlice'
import { formatCurrency } from '@/utils/formatCurrency'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex gap-4 py-4 border-b">
      <img
        src={item.images?.[0] || '/placeholder-product.png'}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
            className="p-1 border rounded"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            className="p-1 border rounded"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="mt-2 text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default CartItem
