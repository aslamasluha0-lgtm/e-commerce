import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from './api/apiConstants'

export const userService = {
  getById: async (id) => {
    const { data } = await axiosInstance.get(`${API_ENDPOINTS.USERS}/${id}`)
    return data
  },

  update: async (id, userData) => {
    const { data } = await axiosInstance.put(`${API_ENDPOINTS.USERS}/${id}`, userData)
    return data
  },

  getAll: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USERS, { params })
    return data
  },
}
