import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from './api/apiConstants'

export const reviewService = {
  getByProduct: async (productId) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.REVIEWS, {
      params: { productId },
    })
    return data
  },

  create: async (reviewData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.REVIEWS, reviewData)
    return data
  },

  delete: async (id) => {
    await axiosInstance.delete(`${API_ENDPOINTS.REVIEWS}/${id}`)
  },

  getAll: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.REVIEWS, { params })
    return data
  },
}
