export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9)
}

export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-product.png'
  if (imagePath.startsWith('http')) return imagePath
  return `${import.meta.env.VITE_API_URL}${imagePath}`
}
