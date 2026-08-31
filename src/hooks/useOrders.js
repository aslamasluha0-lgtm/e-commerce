import { useOrderQueries } from '@/queries/orderQueries'

export const useOrders = (params) => {
  const { useAllOrders } = useOrderQueries()
  return useAllOrders(params)
}

export const useOrder = (id) => {
  const { useOrder: useOrderQuery } = useOrderQueries()
  return useOrderQuery(id)
}
