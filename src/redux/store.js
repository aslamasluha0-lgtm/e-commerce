import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/wishlistSlice'
import compareReducer from './slices/compareSlice'
import uiReducer from './slices/uiSlice'
import toastReducer from './slices/toastSlice'
import checkoutReducer from './slices/checkoutSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    ui: uiReducer,
    toast: toastReducer,
    checkout: checkoutReducer,
  },
})

export default store
