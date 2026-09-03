import { Search, X } from 'lucide-react'

const ProductSearch = ({ value, onChange, placeholder = 'Search products...', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400 dark:text-surface-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="h-11 w-full rounded-xl border border-surface-200 bg-white pl-10 pr-10 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-500"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-surface-400 transition-colors hover:bg-surface-200 hover:text-surface-600 dark:text-surface-500 dark:hover:bg-surface-700 dark:hover:text-surface-300"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

export default ProductSearch
