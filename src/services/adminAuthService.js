import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from './api/apiConstants'

export const adminAuthService = {
  login: async ({ email, password }) => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.USERS,
      {
        params: {
          email,
          password,
          role: 'admin',
          blocked: false,
        },
      }
    )

    if (!data || data.length === 0) {
      throw new Error('Invalid admin credentials')
    }

    return data[0]
  },
}