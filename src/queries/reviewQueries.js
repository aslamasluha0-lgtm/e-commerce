import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/reviewService'

export const useReviewQueries = () => {
  const queryClient = useQueryClient()

  const useProductReviews = (productId) => {
    return useQuery({
      queryKey: ['reviews', productId],
      queryFn: () => reviewService.getByProduct(productId),
      enabled: !!productId,
    })
  }

  const useAllReviews = (params) => {
    return useQuery({
      queryKey: ['reviews', params],
      queryFn: () => reviewService.getAll(params),
    })
  }

  const useCreateReview = () => {
    return useMutation({
      mutationFn: reviewService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reviews'] })
      },
    })
  }

  const useDeleteReview = () => {
    return useMutation({
      mutationFn: reviewService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reviews'] })
      },
    })
  }

  return {
    useProductReviews,
    useAllReviews,
    useCreateReview,
    useDeleteReview,
  }
}
