import { storage } from '@/utils/storage'

const WISHLIST_KEY_PREFIX = 'wishlist_user_'

export const getWishlistKey = (userId) => `${WISHLIST_KEY_PREFIX}${userId}`

const asArray = (value) => (Array.isArray(value) ? value : [])

export const wishlistService = {
  loadWishlist: (userId) => {
    if (!userId) return []
    try {
      return asArray(storage.get(getWishlistKey(userId)))
    } catch {
      return []
    }
  },

  saveWishlist: (userId, items) => {
    if (!userId) return
    storage.set(getWishlistKey(userId), items)
  },
}