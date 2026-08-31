const ProductFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
            !selectedCategory ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
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
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-gray-900">Price Range</h3>
        <input type="range" min="0" max="100000" className="w-full" />
      </div>
    </div>
  )
}

export default ProductFilter
