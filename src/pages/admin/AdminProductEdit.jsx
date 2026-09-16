import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import ProductForm from '@/components/admin/ProductForm'
import AdminLoading from '@/components/admin/AdminLoading'
import AdminError from '@/components/admin/AdminError'

const slugify = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Failed to update product. Please try again.'

const AdminProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: product,
    isPending: productPending,
    isError: productError,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: ['admin-product', id],
    queryFn: () => productService.getById(id),
    enabled: Boolean(id),
  })

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id: productId, productData }) =>
      productService.update(productId, productData),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin-products'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin-product', id],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin-dashboard-products'],
        }),
      ])
      toast.success('Product updated successfully')
      navigate('/admin/products')
    },
    onError: () => toast.error('Failed to update product'),
  })

  const handleUpdate = (formData) => {
    if (updateMutation.isPending) return
    const category = categories.find((c) => c.id === formData.categoryId)
    updateMutation.mutate({
      id,
      productData: {
        ...product,
        name: formData.name,
        slug: slugify(formData.name),
        description: formData.description,
        price: formData.price,
        categoryId: formData.categoryId,
        category: category?.name,
        stock: formData.stock,
        images: formData.images,
      },
    })
  }

  if (productPending) {
    return (
      <div className="p-6">
        <AdminLoading message="Loading Product..." />
      </div>
    )
  }

  if (productError || !product) {
    return (
      <div className="p-6">
        <AdminError message="Unable to load product." onRetry={refetchProduct} />
        <div className="mt-4 flex justify-center">
          <Link
            to="/admin/products"
            className="inline-flex items-center rounded-lg border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          Edit Product
        </h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Admin Products / Edit Product
        </p>
      </div>

      <div className="max-w-4xl rounded-2xl border border-surface-200 bg-white p-6 shadow-soft dark:border-surface-800 dark:bg-surface-900">
        {categoriesLoading ? (
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Loading categories...
          </p>
        ) : (
          <ProductForm
            initialData={product}
            onSubmit={handleUpdate}
            onCancel={() => navigate('/admin/products')}
            categories={categories}
            loading={updateMutation.isPending}
            error={
              updateMutation.isError
                ? getErrorMessage(updateMutation.error)
                : undefined
            }
            submitLabel="Save Changes"
          />
        )}
      </div>
    </div>
  )
}

export default AdminProductEdit