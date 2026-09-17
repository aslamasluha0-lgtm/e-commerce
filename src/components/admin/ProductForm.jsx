import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { productSchema } from '@/utils/validators'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ProductImage from '@/components/common/ProductImage'

const ProductForm = ({
  onSubmit,
  onCancel,
  categories = [],
  loading = false,
  error,
  initialData,
  submitLabel = 'Save Product',
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      categoryId: '',
      stock: '',
      images: [],
    },
  })

  const [images, setImages] = useState(() => initialData?.images || [])
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        categoryId: initialData.categoryId,
        stock: initialData.stock,
        images: initialData.images || [],
      })
    }
  }, [initialData, reset])

  const updateImages = (next) => {
    setImages(next)
    setValue('images', next, { shouldValidate: true, shouldDirty: true })
  }

  const addImage = () => {
    const url = imageUrl.trim()
    if (!url) return
    updateImages([...images, url])
    setImageUrl('')
  }

  const removeImage = (index) => {
    updateImages(images.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Product Name"
          placeholder="e.g. Mechanical Keyboard X1"
          {...register('name')}
          error={errors.name?.message}
        />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
            Category
          </label>
          <select
            {...register('categoryId', {
              setValueAs: (v) => (v === '' ? undefined : Number(v)),
            })}
            className="h-11 w-full rounded-lg border border-surface-200 bg-white px-3.5 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/60 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Price (INR)"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          {...register('price', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          error={errors.price?.message}
        />
        <Input
          label="Stock"
          type="number"
          step="1"
          min="0"
          placeholder="0"
          {...register('stock', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          error={errors.stock?.message}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          placeholder="Describe the product in detail"
          className="w-full rounded-lg border border-surface-200 bg-white px-3.5 py-2.5 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/60 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
          Images
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addImage()
              }
            }}
            placeholder="https://example.com/product-image.jpg"
            className="h-11 w-full flex-1 rounded-lg border border-surface-200 bg-white px-3.5 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/60 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-500"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addImage}
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add Image
          </Button>
        </div>
        {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>}
        <input type="hidden" {...register('images')} />

        {images.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {images.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative h-20 w-20 overflow-hidden rounded-lg border border-surface-200 dark:border-surface-700"
              >
                <ProductImage
                  src={src}
                  alt={`Product image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label={`Remove image ${index + 1}`}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-soft hover:bg-red-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" loading={loading} disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default ProductForm