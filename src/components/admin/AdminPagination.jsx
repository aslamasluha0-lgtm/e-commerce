const AdminPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav
      aria-label="Table pagination"
      className="flex items-center justify-center gap-2 mt-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="px-3 py-1 rounded border border-surface-300 text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:text-surface-300 dark:hover:bg-surface-800 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <span className="px-3 py-1 text-sm text-surface-600 dark:text-surface-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className="px-3 py-1 rounded border border-surface-300 text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:text-surface-300 dark:hover:bg-surface-800 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  )
}

export default AdminPagination