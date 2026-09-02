import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Heart className="h-24 w-24 text-gray-300 mb-4 dark:text-gray-700" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-gray-100">Your wishlist is empty</h2>
      <p className="text-gray-500 mb-6 dark:text-gray-400">Save products you love for later!</p>
      <Link to="/products">
        <Button>Browse Products</Button>
      </Link>
    </div>
  )
}

export default EmptyWishlist
