import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from './api/apiConstants'

export const orderService = {
  getAll: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ORDERS, { params })
    return data
  },

  getById: async (id) => {
    const { data } = await axiosInstance.get(`${API_ENDPOINTS.ORDERS}/${id}`)
    return data
  },

  create: async (orderData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.ORDERS, orderData)
    return data
  },

  updateStatus: async (id, status) => {
    const { data } = await axiosInstance.patch(`${API_ENDPOINTS.ORDERS}/${id}`, { status })
    return data
  },

  getByUser: async (userId) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ORDERS, {
      params: { userId },
    })
    return data
  },
}
