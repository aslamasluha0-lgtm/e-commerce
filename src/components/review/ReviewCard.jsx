import { Star } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'

const ReviewCard = ({ review }) => {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900">
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-surface-300 dark:text-surface-600'
            }`}
          />
        ))}
      </div>
      <h4 className="font-medium text-surface-900 dark:text-surface-100">{review.title}</h4>
      <p className="text-sm text-surface-600 mt-1 dark:text-surface-300">{review.comment}</p>
      <p className="text-xs text-surface-400 mt-2 dark:text-surface-500">
        by {review.userName} on {formatDate(review.date)}
      </p>
    </div>
  )
}

export default ReviewCard
