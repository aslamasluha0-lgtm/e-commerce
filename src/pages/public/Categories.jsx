import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { categoryService } from '@/services/categoryService'
import Loader from '@/components/common/Loader'

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  })

  if (isLoading) return <Loader className="py-20" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.id}`}
            className="block p-6 bg-white border rounded-lg hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
            {category.description && (
              <p className="text-gray-600 mt-2">{category.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
