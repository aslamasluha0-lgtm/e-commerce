import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <ShoppingCart className="h-24 w-24 text-gray-300 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Add some products to get started!</p>
      <Link to="/products">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  )
}

export default EmptyCart
