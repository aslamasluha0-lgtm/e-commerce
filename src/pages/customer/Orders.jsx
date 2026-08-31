import { useOrders } from '@/hooks/useOrders'
import { useAuth } from '@/hooks/useAuth'
import OrderCard from '@/components/order/OrderCard'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import { Package } from 'lucide-react'

const Orders = () => {
  const { user } = useAuth()
  const { data: orders, isLoading } = useOrders({ userId: user?.id })

  if (isLoading) return <Loader className="py-20" />

  if (!orders?.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="No orders yet"
          description="Start shopping to place your first order!"
          icon={Package}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
