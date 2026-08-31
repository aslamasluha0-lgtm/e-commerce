import { Star } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <h4 className="font-medium text-gray-900">{review.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
      <p className="text-xs text-gray-400 mt-2">
        by {review.userName} on {formatDate(review.date)}
      </p>
    </div>
  )
}

export default ReviewCard
