import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '@/utils/validators'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

const AddProduct = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data) => {
    console.log('Add product:', data)
    // Future: Call API to create product
    navigate('/admin/products')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <Input label="Product Name" {...register('name')} error={errors.name?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price" type="number" {...register('price', { valueAsNumber: true })} error={errors.price?.message} />
          <Input label="Stock" type="number" {...register('stock', { valueAsNumber: true })} error={errors.stock?.message} />
        </div>
        <Input label="Category ID" type="number" {...register('categoryId', { valueAsNumber: true })} error={errors.categoryId?.message} />
        <div className="flex gap-4">
          <Button type="submit">Add Product</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
