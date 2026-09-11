const ProductForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
          Product Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
          Price
        </label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save Product
      </button>
    </form>
  )
}

export default ProductForm
