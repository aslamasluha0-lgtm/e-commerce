import { AlertCircle } from 'lucide-react'
import Button from './Button'

const ErrorMessage = ({ message = "Something went wrong. We couldn't load this content.", onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-16 px-6 text-center ${className}`}>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100 dark:bg-red-950/40 dark:ring-red-900">
        <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-semibold text-surface-900 dark:text-surface-100">Something went wrong</p>
        <p className="text-sm text-surface-500 mt-1 max-w-sm dark:text-surface-400">{message}</p>
      </div>
      {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try Again</Button>}
    </div>
  )
}

export default ErrorMessage