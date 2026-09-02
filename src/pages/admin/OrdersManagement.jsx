import { useOrders } from '@/hooks/useOrders'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import Loader from '@/components/common/Loader'

const OrdersManagement = () => {
  const { data: orders, isLoading } = useOrders({ _limit: 50 })

  if (isLoading) return <Loader className="py-20" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Orders Management</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders?.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 dark:text-gray-200">#{order.id}</td>
                <td className="px-6 py-4 dark:text-gray-200">{order.userId}</td>
                <td className="px-6 py-4 dark:text-gray-200">{formatDate(order.date)}</td>
                <td className="px-6 py-4 dark:text-gray-200">{formatCurrency(order.total)}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersManagement
