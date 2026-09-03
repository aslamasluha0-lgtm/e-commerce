import { LayoutGrid, Tag } from 'lucide-react'
import { formatCurrency } from '@/utils/formatCurrency'

const MAX_PRICE = 200000

const ProductFilter = ({ categories, selectedCategory, onCategoryChange, maxPrice, onMaxPriceChange }) => {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100">
            Categories
          </h3>
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
              !selectedCategory
                ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
            }`}
          >
            All Categories
          </button>
          {categories?.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                String(selectedCategory) === String(category.id)
                  ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                  : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
              }`}
            >
              <span className="line-clamp-1 text-left">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="border-t border-surface-200 pt-5 dark:border-surface-800">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100">
              Price Range
            </h3>
          </div>
          {maxPrice < MAX_PRICE && (
            <button
              onClick={() => onMaxPriceChange(MAX_PRICE)}
              className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              Clear
            </button>
          )}
        </div>
        <p className="mb-3 text-sm text-surface-600 dark:text-surface-300">
          {maxPrice < MAX_PRICE ? (
            <>Up to <span className="font-semibold">{formatCurrency(maxPrice)}</span></>
          ) : (
            'Any price'
          )}
        </p>
        <input
          type="range"
          min="0"
          max={MAX_PRICE}
          step="1000"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          aria-label="Maximum price"
          className="w-full accent-brand-600"
        />
        <div className="mt-1 flex justify-between text-xs text-surface-400 dark:text-surface-500">
          <span>₹0</span>
          <span>{formatCurrency(MAX_PRICE)}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
