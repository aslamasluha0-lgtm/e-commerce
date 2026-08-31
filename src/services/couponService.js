import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from './api/apiConstants'

export const couponService = {
  getAll: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COUPONS)
    return data
  },

  validate: async (code) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COUPONS, {
      params: { code },
    })
    return data
  },

  create: async (couponData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.COUPONS, couponData)
    return data
  },

  delete: async (id) => {
    await axiosInstance.delete(`${API_ENDPOINTS.COUPONS}/${id}`)
  },
}
