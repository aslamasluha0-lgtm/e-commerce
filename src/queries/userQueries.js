import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/userService'

export const useUserQueries = () => {
  const queryClient = useQueryClient()

  const useUser = (id) => {
    return useQuery({
      queryKey: ['user', id],
      queryFn: () => userService.getById(id),
      enabled: !!id,
    })
  }

  const useAllUsers = (params) => {
    return useQuery({
      queryKey: ['users', params],
      queryFn: () => userService.getAll(params),
    })
  }

  const useUpdateUser = () => {
    return useMutation({
      mutationFn: ({ id, data }) => userService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
      },
    })
  }

  return {
    useUser,
    useAllUsers,
    useUpdateUser,
  }
}
