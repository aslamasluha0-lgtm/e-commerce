import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  buyNowItem: null,
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload
    },
    clearBuyNowItem: (state) => {
      state.buyNowItem = null
    },
  },
})

export const { setBuyNowItem, clearBuyNowItem } = checkoutSlice.actions
export default checkoutSlice.reducer
