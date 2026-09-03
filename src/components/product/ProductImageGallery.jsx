import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductImage from '@/components/common/ProductImage'

const ProductImageGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface-100 dark:bg-surface-800">
        <span className="text-surface-400 dark:text-surface-500">No image available</span>
      </div>
    )
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900">
        <ProductImage
          src={images[selectedIndex]}
          alt="Product"
          className="h-full w-full object-contain p-6"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-surface-700 shadow-soft backdrop-blur transition-all hover:bg-white dark:bg-surface-800/90 dark:text-surface-200 dark:hover:bg-surface-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-surface-700 shadow-soft backdrop-blur transition-all hover:bg-white dark:bg-surface-800/90 dark:text-surface-200 dark:hover:bg-surface-700"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-none">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative flex aspect-square w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-white transition-all ${
                selectedIndex === index
                  ? 'border-brand-600 ring-2 ring-brand-600/20'
                  : 'border-surface-200 hover:border-surface-300 dark:border-surface-700 dark:hover:border-surface-600'
              }`}
            >
              <ProductImage
                src={image}
                alt=""
                className="h-full w-full object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery
