import Skeleton, { SkeletonText } from './Skeleton'

const ProductCardSkeleton = () => {
  return (
    <div className="group rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 overflow-hidden">
      <div className="aspect-square bg-surface-100 dark:bg-surface-800 relative">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
        </div>
        <SkeletonText lines={2} />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export const CategoryCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="h-5 w-24 mt-4" />
      <Skeleton className="h-4 w-32 mt-2" />
    </div>
  )
}

export const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-20 w-20 rounded-xl" />
            <Skeleton className="h-20 w-20 rounded-xl" />
            <Skeleton className="h-20 w-20 rounded-xl" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 w-40 rounded-lg" />
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const OrderCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton