const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-surface-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">{message}</p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
