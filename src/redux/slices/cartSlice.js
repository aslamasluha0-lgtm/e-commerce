import { createSlice } from '@reduxjs/toolkit'
import { storage, STORAGE_KEYS } from '@/utils/storage'

const initialState = {
  items: storage.get(STORAGE_KEYS.CART) || [],
}

const normalizeCartItem = (product) => {
  const effectivePrice = product.discountPrice || product.price
  return {
    ...product,
    price: effectivePrice,
    originalPrice: product.discountPrice ? product.price : undefined,
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const normalized = normalizeCartItem(action.payload)
      const existingItem = state.items.find((item) => item.id === normalized.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...normalized, quantity: 1 })
      }
      storage.set(STORAGE_KEYS.CART, state.items)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      storage.set(STORAGE_KEYS.CART, state.items)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity = quantity
      }
      storage.set(STORAGE_KEYS.CART, state.items)
    },
    clearCart: (state) => {
      state.items = []
      storage.set(STORAGE_KEYS.CART, state.items)
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon } = cartSlice.actions
export default cartSlice.reducer
