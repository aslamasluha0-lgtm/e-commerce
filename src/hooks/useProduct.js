import { useProductQueries } from '@/queries/productQueries'

export const useProduct = (id) => {
  const { useProduct: useProductQuery } = useProductQueries()
  return useProductQuery(id)
}
