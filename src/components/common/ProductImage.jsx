import { useState } from 'react'

const PLACEHOLDER = '/placeholder-product.svg'

const ProductImage = ({ src, alt = '', className = '' }) => {
  const [erroredSrc, setErroredSrc] = useState(null)
  const showFallback = !src || erroredSrc === src
  const resolved = showFallback ? PLACEHOLDER : src

  return (
    <img
      src={resolved}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`bg-surface-100 dark:bg-surface-800 ${className}`}
      onError={() => setErroredSrc(src)}
    />
  )
}

export default ProductImage