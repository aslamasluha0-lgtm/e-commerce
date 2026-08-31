import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from './api/apiConstants'

export const categoryService = {
  getAll: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.CATEGORIES)
    return data
  },

  getById: async (id) => {
    const { data } = await axiosInstance.get(`${API_ENDPOINTS.CATEGORIES}/${id}`)
    return data
  },

  create: async (categoryData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.CATEGORIES, categoryData)
    return data
  },

  update: async (id, categoryData) => {
    const { data } = await axiosInstance.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, categoryData)
    return data
  },

  delete: async (id) => {
    await axiosInstance.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`)
  },
}
