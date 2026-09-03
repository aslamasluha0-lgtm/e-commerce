import { ArrowUpDown } from 'lucide-react'

const ProductSort = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'name_asc', label: 'Name: A to Z' },
  ]

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-surface-400 dark:text-surface-500" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort products"
        className="h-10 cursor-pointer rounded-xl border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductSort
