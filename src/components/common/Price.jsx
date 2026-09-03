import { formatCurrency } from '@/utils/formatCurrency'

const Price = ({ price, originalPrice, size = 'md', className = '' }) => {
  const hasDiscount = originalPrice && originalPrice > price
  const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const sizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  return (
    <div className={`flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className={`font-semibold text-surface-900 dark:text-surface-100 ${sizes[size]}`}>
        {formatCurrency(price)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-sm text-surface-400 line-through dark:text-surface-500">
            {formatCurrency(originalPrice)}
          </span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  )
}

export default Price
