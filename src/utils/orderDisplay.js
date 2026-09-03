export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  failed: 'Failed',
  refunded: 'Refunded',
}

export const getOrderStatus = (order) => order?.orderStatus || order?.status || 'pending'

export const getOrderStatusLabel = (order) =>
  ORDER_STATUS_LABELS[getOrderStatus(order)] ||
  ORDER_STATUS_LABELS[String(getOrderStatus(order)).toLowerCase()] ||
  'Pending'

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800',
  confirmed:
    'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-800',
  processing:
    'bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:ring-indigo-800',
  shipped:
    'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-800',
  out_for_delivery:
    'bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:ring-teal-800',
  delivered:
    'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800',
  cancelled:
    'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-800',
  failed: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-800',
  refunded:
    'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-800',
}

const STATUS_DOTS = {
  pending: 'bg-amber-500',
  confirmed: 'bg-blue-500',
  processing: 'bg-indigo-500',
  shipped: 'bg-purple-500',
  out_for_delivery: 'bg-teal-500',
  delivered: 'bg-emerald-500',
  cancelled: 'bg-red-500',
  failed: 'bg-red-500',
  refunded: 'bg-rose-500',
}

export const getStatusStyle = (order) =>
  STATUS_STYLES[String(getOrderStatus(order)).toLowerCase()] || STATUS_STYLES.pending

export const getStatusDot = (order) =>
  STATUS_DOTS[String(getOrderStatus(order)).toLowerCase()] || STATUS_DOTS.pending

export const getPaymentMethodLabel = (method) => {
  const key = String(method || '').toLowerCase()
  if (key === 'cod') return 'Cash on Delivery'
  if (key === 'razorpay') return 'Razorpay'
  if (key === 'upi') return 'UPI'
  if (key === 'card') return 'Card'
  return method || 'Not available'
}

export const isRazorpayOrder = (order) =>
  String(order?.paymentMethod || '').toLowerCase() === 'razorpay'

export const getPaymentStatusLabel = (status) => {
  const key = String(status || '').toLowerCase()
  if (key === 'paid') return 'Paid'
  if (key === 'pending') return 'Pending'
  if (key === 'failed') return 'Failed'
  return status || 'Not available'
}