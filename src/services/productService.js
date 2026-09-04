import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from './api/apiConstants'

export const productService = {
  getAll: async (params) => {
    const { data, headers } = await axiosInstance.get(API_ENDPOINTS.PRODUCTS, { params })
    const totalCount = headers['x-total-count'] ? Number(headers['x-total-count']) : undefined
    return { items: data, totalCount }
  },

  getById: async (id) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.PRODUCT_BY_ID(id))
    return data
  },

  create: async (productData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.PRODUCTS, productData)
    return data
  },

  update: async (id, productData) => {
    const { data } = await axiosInstance.put(API_ENDPOINTS.PRODUCT_BY_ID(id), productData)
    return data
  },

  delete: async (id) => {
    await axiosInstance.delete(API_ENDPOINTS.PRODUCT_BY_ID(id))
  },

  search: async (query) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.PRODUCTS, {
      params: { q: query },
    })
    return data
  },
}
