const StatCard = ({ title, value, description, icon: Icon }) => {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover dark:border-surface-800 dark:bg-surface-900">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-surface-500 dark:text-surface-400">{title}</p>
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
        )}
      </div>

      <p className="mt-2 text-3xl font-bold tracking-tight text-surface-900 dark:text-white">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">{description}</p>
      )}
    </div>
  )
}

export default StatCard