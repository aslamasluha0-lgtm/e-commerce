import { useNavigate, useParams } from 'react-router-dom'
import { useProduct } from '@/hooks/useProduct'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '@/utils/validators'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Loader from '@/components/common/Loader'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading } = useProduct(id)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    values: product,
  })

  if (isLoading) return <Loader className="py-20" />

  const onSubmit = (data) => {
    console.log('Update product:', data)
    navigate('/admin/products')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6 space-y-6 dark:bg-gray-800">
        <Input label="Product Name" {...register('name')} error={errors.name?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Price" type="number" {...register('price', { valueAsNumber: true })} error={errors.price?.message} />
          <Input label="Stock" type="number" {...register('stock', { valueAsNumber: true })} error={errors.stock?.message} />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Update Product</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
