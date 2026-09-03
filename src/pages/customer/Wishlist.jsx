import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import WishlistItem from '@/components/wishlist/WishlistItem'
import EmptyWishlist from '@/components/wishlist/EmptyWishlist'

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist)

  if (!items.length) return <EmptyWishlist />

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl dark:text-surface-50">
        My Wishlist
      </h1>
      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
        {items.length} saved item{items.length !== 1 ? 's' : ''}
      </p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>

      <Link
        to="/products"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>
    </div>
  )
}

export default Wishlist
