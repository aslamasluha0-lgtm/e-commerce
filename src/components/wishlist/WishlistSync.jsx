import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadWishlist, clearWishlist } from '@/redux/slices/wishlistSlice'

const WishlistSync = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?.id)

  useEffect(() => {
    if (userId) {
      dispatch(loadWishlist(userId))
    } else {
      dispatch(clearWishlist())
    }
  }, [userId, dispatch])

  return null
}

export default WishlistSync