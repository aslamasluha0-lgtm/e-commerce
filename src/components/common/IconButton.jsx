const IconButton = ({
  children,
  label = '',
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    ghost:
      'text-surface-500 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800',
    brand:
      'text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-950/40',
    danger: 'text-surface-500 hover:text-red-600 hover:bg-red-50 dark:text-surface-400 dark:hover:text-red-400 dark:hover:bg-red-950/40',
    solidWhite:
      'bg-white/90 text-surface-800 shadow-soft backdrop-blur hover:bg-white dark:bg-surface-800/90 dark:text-surface-100 dark:hover:bg-surface-700',
  }

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton
