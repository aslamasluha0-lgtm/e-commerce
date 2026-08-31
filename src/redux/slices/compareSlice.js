import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  maxItems: 4,
}

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      if (state.items.length < state.maxItems) {
        const exists = state.items.find((item) => item.id === action.payload.id)
        if (!exists) {
          state.items.push(action.payload)
        }
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCompare: (state) => {
      state.items = []
    },
  },
})

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions
export default compareSlice.reducer
