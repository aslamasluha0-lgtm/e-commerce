import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import ProductForm from '@/components/admin/ProductForm'

const slugify = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Failed to create product. Please try again.'

const AdminProductCreate = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  })

  const createProductMutation = useMutation({
    mutationFn: (productData) => productService.create(productData),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin-products'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin-dashboard-products'],
        }),
      ])
      toast.success('Product created successfully')
      navigate('/admin/products')
    },
    onError: () => toast.error('Failed to save product'),
  })

  const handleCreate = (formData) => {
    if (createProductMutation.isPending) return
    const category = categories.find((c) => c.id === formData.categoryId)
    createProductMutation.mutate({
      name: formData.name,
      slug: slugify(formData.name),
      description: formData.description,
      price: formData.price,
      categoryId: formData.categoryId,
      category: category?.name,
      stock: formData.stock,
      images: formData.images,
      currency: 'INR',
      rating: 0,
      reviewCount: 0,
      featured: false,
      trending: false,
      isActive: true,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Add Product</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Admin Products / Add Product
        </p>
      </div>

      <div className="max-w-4xl rounded-2xl border border-surface-200 bg-white p-6 shadow-soft dark:border-surface-800 dark:bg-surface-900">
        {categoriesLoading ? (
          <p className="text-sm text-surface-500 dark:text-surface-400">Loading categories...</p>
        ) : (
          <ProductForm
            onSubmit={handleCreate}
            onCancel={() => navigate('/admin/products')}
            categories={categories}
            loading={createProductMutation.isPending}
            error={createProductMutation.isError ? getErrorMessage(createProductMutation.error) : undefined}
          />
        )}
      </div>
    </div>
  )
}

export default AdminProductCreate