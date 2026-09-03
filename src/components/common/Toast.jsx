import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react'
import { hideToast } from '@/redux/slices/toastSlice'

const TOAST_TIMEOUT = 3000

const ToastItem = ({ toast, onDismiss }) => {
  const config = {
    success: {
      Icon: CheckCircle2,
      ring: 'border-emerald-200 dark:border-emerald-900',
      iconClass: 'text-emerald-500 dark:text-emerald-400',
    },
    error: {
      Icon: XCircle,
      ring: 'border-red-200 dark:border-red-900',
      iconClass: 'text-red-500 dark:text-red-400',
    },
    warning: {
      Icon: AlertTriangle,
      ring: 'border-amber-200 dark:border-amber-900',
      iconClass: 'text-amber-500 dark:text-amber-400',
    },
    info: {
      Icon: Info,
      ring: 'border-surface-200 dark:border-surface-700',
      iconClass: 'text-brand-500 dark:text-brand-400',
    },
  }

  const { Icon, ring, iconClass } = config[toast.type] || config.info

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-auto flex items-start gap-3 rounded-xl border bg-white p-3 shadow-soft-md animate-toast-in dark:bg-surface-900 ${ring}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${iconClass}`} strokeWidth={2} />
      <div className="flex-1 min-w-0">
        {toast.message && (
          <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
            {toast.message}
          </p>
        )}
        {toast.description && (
          <p className="text-xs text-surface-500 mt-0.5 dark:text-surface-400">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

const ToastProvider = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.toast)

  useEffect(() => {
    if (!items.length) return undefined
    const timers = items.map((toast) =>
      setTimeout(() => dispatch(hideToast(toast.id)), TOAST_TIMEOUT)
    )
    return () => timers.forEach(clearTimeout)
  }, [items, dispatch])

  if (!items.length) return null

  return (
    <div
      className="pointer-events-none fixed top-4 right-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2.5"
      aria-live="polite"
    >
      {items.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={(id) => dispatch(hideToast(id))}
        />
      ))}
    </div>
  )
}

export default ToastProvider
