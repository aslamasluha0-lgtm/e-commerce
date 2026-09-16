const StatCard = ({
  title,
  value,
  description,
}) => {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm dark:border-surface-800 dark:bg-surface-900">

      <p className="text-sm font-medium text-surface-500 dark:text-surface-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-surface-900 dark:text-white">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
          {description}
        </p>
      )}

    </div>
  )
}

export default StatCard