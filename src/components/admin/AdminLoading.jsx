const AdminLoading = ({ message = 'Loading...' }) => {
  return (
    <div
      className="flex min-h-[240px] items-center justify-center"
      role="status"
      aria-busy="true"
      aria-label={message}
    >
      <div className="flex items-center gap-3 text-sm text-surface-500 dark:text-surface-400">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-surface-300 border-t-surface-900 dark:border-surface-700 dark:border-t-white" />
        <span>{message}</span>
      </div>
    </div>
  )
}

export default AdminLoading