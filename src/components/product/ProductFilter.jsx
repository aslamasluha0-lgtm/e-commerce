import { formatCurrency } from '@/utils/formatCurrency'

const MAX_PRICE = 200000

const ProductFilter = ({ categories, selectedCategory, onCategoryChange, maxPrice, onMaxPriceChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
            !selectedCategory ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          All Categories
        </button>
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
              String(selectedCategory) === String(category.id)
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-4 pt-4 border-t dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Price Range</h3>
          {maxPrice < MAX_PRICE && (
            <button
              onClick={() => onMaxPriceChange(MAX_PRICE)}
              className="text-xs text-blue-600 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {maxPrice < MAX_PRICE
            ? <>Up to {formatCurrency(maxPrice)}</>
            : 'Any price'}
        </p>
        <input
          type="range"
          min="0"
          max={MAX_PRICE}
          step="1000"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>
    </div>
  )
}

export default ProductFilter
