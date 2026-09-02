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
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center dark:bg-gray-800">
        <span className="text-gray-400 dark:text-gray-500">No image available</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
        <ProductImage
          src={images[selectedIndex]}
          alt="Product"
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                selectedIndex === index ? 'border-blue-600' : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <ProductImage src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery
