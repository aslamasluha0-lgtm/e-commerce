import { createSlice } from '@reduxjs/toolkit'
import { storage, STORAGE_KEYS } from '@/utils/storage'

const initialState = {
  items: storage.get(STORAGE_KEYS.WISHLIST) || [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        storage.set(STORAGE_KEYS.WISHLIST, state.items)
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      storage.set(STORAGE_KEYS.WISHLIST, state.items)
    },
    clearWishlist: (state) => {
      state.items = []
      storage.set(STORAGE_KEYS.WISHLIST, state.items)
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
