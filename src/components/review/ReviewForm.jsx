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
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Rating</label>
        <select
          {...register('rating', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
      </div>
      <Input
        label="Title"
        {...register('title')}
        error={errors.title?.message}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Comment</label>
        <textarea
          {...register('comment')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
        />
        {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
      </div>
      <Button type="submit" loading={loading}>Submit Review</Button>
    </form>
  )
}

export default ReviewForm
