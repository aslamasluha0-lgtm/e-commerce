import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken, logout as logoutAction, setLoading, setError } from '@/redux/slices/authSlice'
import { authService } from '@/services/authService'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth)

  const login = async (credentials) => {
    dispatch(setLoading(true))
    try {
      const response = await authService.login(credentials)
      dispatch(setToken(response.token))
      dispatch(setUser(response.user))
      return response
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message || 'Login failed'))
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }

  const register = async (userData) => {
    dispatch(setLoading(true))
    try {
      const response = await authService.register(userData)
      dispatch(setToken(response.token))
      dispatch(setUser(response.user))
      return response
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message || 'Registration failed'))
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }

  const logout = () => {
    authService.logout()
    dispatch(logoutAction())
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
  }
}
