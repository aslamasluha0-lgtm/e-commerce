import ReviewCard from './ReviewCard'
import EmptyState from '@/components/common/EmptyState'

const ReviewList = ({ reviews = [] }) => {
  if (!reviews.length) {
    return <EmptyState title="No reviews yet" description="Be the first to review this product!" />
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}

export default ReviewList
