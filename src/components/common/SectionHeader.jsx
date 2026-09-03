import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const SectionHeader = ({ title, subtitle, actionLabel, actionTo, className = '' }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 ${className}`}
    >
      <div>
        {subtitle && (
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1.5">
            {subtitle}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
          {title}
        </h2>
      </div>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}

export default SectionHeader
