const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-surface-100 dark:bg-surface-800 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5" />
    </div>
  )
}

export const SkeletonText = ({ lines = 1, className = '' }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'} ${className}`}
        />
      ))}
    </div>
  )
}

export const SkeletonCircle = ({ className = 'h-10 w-10' }) => {
  return <Skeleton className={`rounded-full ${className}`} />
}

export default Skeleton