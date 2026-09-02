import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const total = totalPages
    const current = currentPage

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      if (current > 3) pages.push('...')
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
      if (current < total - 2) pages.push('...')
      pages.push(total)
    }
    return pages
  }

  const baseBtn =
    'flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-all'

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${baseBtn} border-surface-200 text-surface-600 hover:bg-surface-100 hover:border-surface-300 disabled:opacity-40 disabled:cursor-not-allowed dark:border-surface-700 dark:text-surface-300 dark:hover:bg-surface-800`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="h-10 px-2 flex items-center text-surface-400 dark:text-surface-500">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`${baseBtn} ${
              currentPage === page
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'border-surface-200 text-surface-600 hover:bg-surface-100 dark:border-surface-700 dark:text-surface-300 dark:hover:bg-surface-800'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${baseBtn} border-surface-200 text-surface-600 hover:bg-surface-100 hover:border-surface-300 disabled:opacity-40 disabled:cursor-not-allowed dark:border-surface-700 dark:text-surface-300 dark:hover:bg-surface-800`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

export default Pagination