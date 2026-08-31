import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/services/productService'

export const useProductQueries = () => {
  const queryClient = useQueryClient()

  const useAllProducts = (params) => {
    return useQuery({
      queryKey: ['products', params],
      queryFn: () => productService.getAll(params),
      staleTime: 5 * 60 * 1000,
    })
  }

  const useProduct = (id) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: () => productService.getById(id),
      enabled: !!id,
    })
  }

  const useSearchProducts = (query) => {
    return useQuery({
      queryKey: ['products', 'search', query],
      queryFn: () => productService.search(query),
      enabled: !!query,
    })
  }

  const useCreateProduct = () => {
    return useMutation({
      mutationFn: productService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
      },
    })
  }

  const useUpdateProduct = () => {
    return useMutation({
      mutationFn: ({ id, data }) => productService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
      },
    })
  }

  const useDeleteProduct = () => {
    return useMutation({
      mutationFn: productService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
      },
    })
  }

  return {
    useAllProducts,
    useProduct,
    useSearchProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  }
}
