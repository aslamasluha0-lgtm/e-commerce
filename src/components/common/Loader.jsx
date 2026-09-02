import { Loader2 } from 'lucide-react'

const Loader = ({ size = 'md', label, className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-7 w-7',
    lg: 'h-10 w-10',
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status" aria-label={label || 'Loading'}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-lg" />
        <Loader2 className={`${sizes[size]} animate-spin text-brand-600 relative dark:text-brand-400`} />
      </div>
      {label && <span className="text-sm text-surface-500 dark:text-surface-400">{label}</span>}
    </div>
  )
}

export default Loader