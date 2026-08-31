import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
  modalOpen: false,
  searchOpen: false,
  theme: 'light',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarOpen, toggleModal, toggleSearch, setTheme } = uiSlice.actions
export default uiSlice.reducer
