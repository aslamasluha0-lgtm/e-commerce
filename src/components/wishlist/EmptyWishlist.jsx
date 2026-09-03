import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmptyState from '@/components/common/EmptyState'
import Button from '@/components/common/Button'

const EmptyWishlist = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-surface-200 bg-white p-8 dark:border-surface-800 dark:bg-surface-900">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save the products you love, and find them here whenever you're ready to buy."
          action={
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      </div>
    </div>
  )
}

export default EmptyWishlist
