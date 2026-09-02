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
      <ArrowUpDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
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
