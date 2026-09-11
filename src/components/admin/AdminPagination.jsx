const AdminPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 rounded border border-surface-300 dark:border-surface-600 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1 text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 rounded border border-surface-300 dark:border-surface-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default AdminPagination
