import { Loader2 } from 'lucide-react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

  const variants = {
    primary:
      'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600 shadow-soft hover:shadow-soft-md',
    secondary:
      'bg-surface-100 text-surface-800 hover:bg-surface-200 focus-visible:ring-surface-400 dark:bg-surface-800 dark:text-surface-100 dark:hover:bg-surface-700',
    outline:
      'border border-surface-200 bg-white text-surface-700 hover:bg-surface-50 hover:border-surface-300 focus-visible:ring-brand-500 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-soft',
    ghost:
      'text-surface-600 hover:bg-surface-100 hover:text-surface-900 focus-visible:ring-surface-400 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-white',
  }

  const sizes = {
    sm: 'h-9 px-3.5 text-sm',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}

export default Button