import { useProductQueries } from '@/queries/productQueries'

export const useProducts = (params) => {
  const { useAllProducts } = useProductQueries()
  return useAllProducts(params)
}
