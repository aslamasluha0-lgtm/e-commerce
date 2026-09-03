import { Star } from 'lucide-react'

const ProductRating = ({ rating, count, showNumber = false, size = 'md', className = '' }) => {
  const starSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
  }
  const starSize = starSizes[size] || starSizes.md

  return (
    <div className={`flex flex-wrap items-center gap-1 ${className}`}>
      <div className="flex items-center" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-surface-200 text-surface-200 dark:fill-surface-700 dark:text-surface-700'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      {showNumber && rating > 0 && (
        <span className="ml-0.5 text-sm font-medium text-surface-700 dark:text-surface-200">
          {rating.toFixed(1)}
        </span>
      )}
      {count !== undefined && count > 0 && (
        <span className="text-xs text-surface-400 dark:text-surface-500">({count})</span>
      )}
    </div>
  )
}

export default ProductRating
