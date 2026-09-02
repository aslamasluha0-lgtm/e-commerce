import { forwardRef } from 'react'

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-surface-700 mb-1.5 dark:text-surface-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full h-11 px-3.5 rounded-lg border bg-white text-surface-900 placeholder:text-surface-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/60 focus:border-brand-500 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-500 ${
          error ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input