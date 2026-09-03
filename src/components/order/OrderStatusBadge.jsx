import { getOrderStatusLabel, getStatusStyle, getStatusDot } from '@/utils/orderDisplay'

const OrderStatusBadge = ({ order, size = 'sm' }) => {
  const label = getOrderStatusLabel(order)
  const style = getStatusStyle(order)
  const dot = getStatusDot(order)

  const sizeClass = size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset ${sizeClass} ${style}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  )
}

export default OrderStatusBadge
