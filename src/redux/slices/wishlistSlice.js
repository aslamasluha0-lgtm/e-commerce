import { createSlice } from '@reduxjs/toolkit'
import { storage, STORAGE_KEYS } from '@/utils/storage'
import { wishlistService } from '@/services/wishlistService'

const getCurrentUserId = () => {
  const user = storage.get(STORAGE_KEYS.USER)
  return user?.id ?? null
}

const initialState = {
  items: wishlistService.loadWishlist(getCurrentUserId()),
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    loadWishlist: (state, action) => {
      state.items = wishlistService.loadWishlist(action.payload)
    },
    addToWishlist: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        wishlistService.saveWishlist(getCurrentUserId(), state.items)
      }
    },
    removeFromWishlist: (state, action) => {
      const updated = state.items.filter((item) => item.id !== action.payload)
      state.items = updated
      wishlistService.saveWishlist(getCurrentUserId(), updated)
    },
    clearWishlist: (state) => {
      state.items = []
    },
  },
})

export const {
  loadWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions

export default wishlistSlice.reducer