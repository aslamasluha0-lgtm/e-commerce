import { useParams } from 'react-router-dom'
import { useOrder } from '@/hooks/useOrders'
import OrderStatus from '@/components/order/OrderStatus'
import OrderTimeline from '@/components/order/OrderTimeline'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import Loader from '@/components/common/Loader'
import ProductImage from '@/components/common/ProductImage'

const OrderDetails = () => {
  const { id } = useParams()
  const { data: order, isLoading } = useOrder(id)

  if (isLoading) return <Loader className="py-20" />
  if (!order) return <div className="text-center py-20">Order not found</div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">Order #{order.id}</h1>
      <p className="text-gray-500 mb-8 dark:text-gray-400">Placed on {formatDate(order.date)}</p>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Order Status</h2>
        <OrderStatus status={order.status} />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Order Items</h2>
        <div className="space-y-4">
          {order.items?.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <ProductImage
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded dark:bg-gray-700"
              />
              <div className="flex-1">
                <p className="font-medium dark:text-gray-100">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold dark:text-gray-100">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-bold dark:border-gray-700">
          <span className="dark:text-gray-100">Total</span>
          <span className="dark:text-gray-100">{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Order Timeline</h2>
        <OrderTimeline events={order.timeline || []} />
      </div>
    </div>
  )
}

export default OrderDetails
