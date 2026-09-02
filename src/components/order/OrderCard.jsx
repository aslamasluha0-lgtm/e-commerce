import { Link } from 'react-router-dom'
import ProductImage from '@/components/common/ProductImage'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const OrderCard = ({ order }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Order #{order.id}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(order.date)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
          {order.status}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {order.items?.slice(0, 3).map((item, index) => (
          <ProductImage
            key={index}
            src={item.image}
            alt=""
            className="w-12 h-12 object-cover rounded"
          />
        ))}
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
          </p>
          <p className="font-semibold dark:text-gray-100">{formatCurrency(order.total)}</p>
        </div>
        <Link
          to={`/orders/${order.id}`}
          className="text-blue-600 text-sm hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default OrderCard
