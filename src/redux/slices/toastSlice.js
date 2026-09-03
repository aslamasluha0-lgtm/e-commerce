import { createSlice } from '@reduxjs/toolkit'

let nextId = 1

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    items: [],
  },
  reducers: {
    showToast: {
      reducer: (state, action) => {
        state.items.push(action.payload)
      },
      prepare: ({ type = 'info', message, description }) => ({
        payload: {
          id: nextId++,
          type,
          message,
          description,
        },
      }),
    },
    hideToast: (state, action) => {
      state.items = state.items.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer
