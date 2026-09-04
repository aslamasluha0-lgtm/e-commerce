import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '@/utils/validators'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

const ReviewForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  })

  const handleFormSubmit = (data) => {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1 dark:text-surface-300">
          Rating
        </label>
        <select
          {...register('rating', { valueAsNumber: true })}
          className="w-full h-11 px-3.5 rounded-lg border border-surface-200 bg-white text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/60 focus:border-brand-500 dark:bg-surface-900 dark:border-surface-700 dark:text-surface-100"
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
      </div>
      <Input
        label="Title"
        {...register('title')}
        error={errors.title?.message}
      />
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1 dark:text-surface-300">
          Comment
        </label>
        <textarea
          {...register('comment')}
          rows={4}
          className="w-full px-3.5 py-2.5 rounded-lg border border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/60 focus:border-brand-500 dark:bg-surface-900 dark:border-surface-700 dark:text-surface-100 dark:placeholder:text-surface-500"
        />
        {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
      </div>
      <Button type="submit" loading={loading}>Submit Review</Button>
    </form>
  )
}

export default ReviewForm
