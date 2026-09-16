import { AlertCircle } from 'lucide-react'
import Button from '@/components/common/Button'

const AdminError = ({ message = 'Unable to load data.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center" role="alert">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100 dark:bg-red-950/40 dark:ring-red-900">
        <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-semibold text-surface-900 dark:text-surface-100">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}

export default AdminError