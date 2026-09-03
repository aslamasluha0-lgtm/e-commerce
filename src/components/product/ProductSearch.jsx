import { Search } from 'lucide-react'

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
        className="h-11 w-full rounded-xl border border-surface-200 bg-white pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-500"
      />
    </div>
  )
}

export default ProductSearch
