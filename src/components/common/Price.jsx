import { formatCurrency } from '@/utils/formatCurrency'

const Price = ({ price, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  return (
    <span className={`font-semibold text-surface-900 dark:text-surface-100 ${sizes[size]} ${className}`}>
      {formatCurrency(price)}
    </span>
  )
}

export default Price
