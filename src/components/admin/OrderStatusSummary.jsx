const ROWS = [
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
]

const OrderStatusSummary = ({
  pending,
  processing,
  shipped,
  delivered,
  cancelled,
}) => {
  const counts = { pending, processing, shipped, delivered, cancelled }

  return (
    <div className="space-y-1">
      {ROWS.map(({ key, label }) => (
        <div
          key={key}
          className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800"
        >
          <span className="text-sm text-surface-600 dark:text-surface-300">
            {label}
          </span>
          <span className="text-sm font-semibold text-surface-900 dark:text-surface-100">
            {counts[key]}
          </span>
        </div>
      ))}
    </div>
  )
}

export default OrderStatusSummary