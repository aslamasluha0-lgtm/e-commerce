import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const AdminBreadcrumb = ({ items }) => (
  <nav aria-label="Breadcrumb" className="mb-4">
    <ol className="flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-surface-400 dark:text-surface-500" />
            )}
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-surface-500 transition-colors hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                className={
                  isLast
                    ? 'font-medium text-surface-900 dark:text-white'
                    : 'text-surface-500 dark:text-surface-400'
                }
              >
                {item.label}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  </nav>
)

export default AdminBreadcrumb