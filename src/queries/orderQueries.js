import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'

export const useOrderQueries = () => {
  const queryClient = useQueryClient()

  const useAllOrders = (params) => {
    return useQuery({
      queryKey: ['orders', params],
      queryFn: () => orderService.getAll(params),
    })
  }

  const useOrder = (id) => {
    return useQuery({
      queryKey: ['order', id],
      queryFn: () => orderService.getById(id),
      enabled: !!id,
    })
  }

  const useUserOrders = (userId) => {
    return useQuery({
      queryKey: ['orders', 'user', userId],
      queryFn: () => orderService.getByUser(userId),
      enabled: !!userId,
    })
  }

  const useCreateOrder = () => {
    return useMutation({
      mutationFn: orderService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      },
    })
  }

  const useUpdateOrderStatus = () => {
    return useMutation({
      mutationFn: ({ id, status }) => orderService.updateStatus(id, status),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      },
    })
  }

  return {
    useAllOrders,
    useOrder,
    useUserOrders,
    useCreateOrder,
    useUpdateOrderStatus,
  }
}
