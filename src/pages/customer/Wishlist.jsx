import { useSelector } from 'react-redux'
import WishlistItem from '@/components/wishlist/WishlistItem'
import EmptyWishlist from '@/components/wishlist/EmptyWishlist'

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist)

  if (!items.length) return <EmptyWishlist />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">My Wishlist ({items.length})</h1>
      <div>
        {items.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Wishlist
