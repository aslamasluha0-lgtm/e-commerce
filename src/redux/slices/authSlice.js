import { createSlice } from '@reduxjs/toolkit'
import { storage } from '@/utils/storage'

const TOKEN_KEY = 'devstore_token'
const USER_KEY = 'devstore_user'

const initialState = {
  user: storage.get(USER_KEY) || null,
  token: storage.get(TOKEN_KEY) || null,
  isAuthenticated: !!storage.get(TOKEN_KEY),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
      storage.set(USER_KEY, action.payload)
    },
    setToken: (state, action) => {
      state.token = action.payload
      storage.set(TOKEN_KEY, action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      storage.remove(TOKEN_KEY)
      storage.remove(USER_KEY)
    },
  },
})

export const { setUser, setToken, setLoading, setError, logout } = authSlice.actions

export default authSlice.reducer
