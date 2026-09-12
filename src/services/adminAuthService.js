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
        },
      }
    )

    if (!data || data.length === 0) {
      throw new Error('Invalid admin credentials')
    }

    const admin = data[0]

    if (admin.blocked) {
      throw new Error('Admin account is blocked')
    }

    if (admin.role !== 'admin') {
      throw new Error('You are not authorized as an admin')
    }

    return admin
  },
}