import { Package } from 'lucide-react'

const EmptyState = ({ title, description, icon: Icon = Package, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-brand-100 blur-2xl opacity-60 dark:bg-brand-950" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-surface-800 dark:to-surface-900 ring-1 ring-brand-100 dark:ring-surface-700">
          <Icon className="h-9 w-9 text-brand-500 dark:text-brand-400" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-surface-900 mb-2 dark:text-surface-100">{title}</h3>
      {description && (
        <p className="text-sm text-surface-500 mb-6 max-w-sm dark:text-surface-400">{description}</p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  )
}

export default EmptyState