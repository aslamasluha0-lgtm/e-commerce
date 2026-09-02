import { useReviewQueries } from '@/queries/reviewQueries'
import Loader from '@/components/common/Loader'

const ReviewsManagement = () => {
  const { useAllReviews } = useReviewQueries()
  const { data: reviews, isLoading } = useAllReviews({ _limit: 50 })

  if (isLoading) return <Loader className="py-20" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Reviews Management</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {reviews?.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 dark:text-gray-200">{review.productId}</td>
                <td className="px-6 py-4 dark:text-gray-200">{review.userName}</td>
                <td className="px-6 py-4 dark:text-gray-200">{review.rating}/5</td>
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
