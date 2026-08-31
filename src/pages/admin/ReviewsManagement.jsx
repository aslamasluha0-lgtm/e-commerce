import { useReviewQueries } from '@/queries/reviewQueries'
import Loader from '@/components/common/Loader'

const ReviewsManagement = () => {
  const { useAllReviews } = useReviewQueries()
  const { data: reviews, isLoading } = useAllReviews({ _limit: 50 })

  if (isLoading) return <Loader className="py-20" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Reviews Management</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews?.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4">{review.productId}</td>
                <td className="px-6 py-4">{review.userName}</td>
                <td className="px-6 py-4">{review.rating}/5</td>
                <td className="px-6 py-4">
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReviewsManagement
