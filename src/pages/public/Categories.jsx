import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categoryService } from '@/services/categoryService'
import { CategoryCardSkeleton } from '@/components/common/Skeletons'
import { CATEGORY_ICONS, FALLBACK_CATEGORY_ICON } from '@/constants/categoryIcons'

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
          Categories
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
          Browse Categories
        </h1>
        <p className="mt-3 text-surface-600 dark:text-surface-300">
          Find exactly what your setup needs — from high-performance laptops to the finishing
          touches that complete your workspace.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => {
          const Icon = CATEGORY_ICONS[category.slug] || FALLBACK_CATEGORY_ICON
          return (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl border border-surface-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-800"
            >
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-surface-100 dark:bg-surface-800">
                {category.image && (
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/70 via-surface-950/10 to-transparent" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 text-brand-600 shadow-soft backdrop-blur dark:bg-surface-900/90 dark:text-brand-400">
                  <Icon className="h-8 w-8" strokeWidth={1.75} />
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-surface-500 dark:text-surface-400">
                    {category.description}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover:gap-2.5 transition-all dark:text-brand-400">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Categories
