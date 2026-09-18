import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Package, Users, ShoppingBag, IndianRupee} from 'lucide-react'

import { useAdminAuth } from '@/hooks/useAdminAuth'
import { productService } from '@/services/productService'
import { userService } from '@/services/userService'
import { orderService } from '@/services/orderService'
import StatCard from '@/components/admin/StatCard'

import AdminLoading from '@/components/admin/AdminLoading'
import AdminError from '@/components/admin/AdminError'
import StatusBadge from '@/components/admin/StatusBadge'

import OrdersChart from '@/components/admin/OrdersChart'
import OrderStatusChart from '@/components/admin/OrderStatusChart'
import { getOrderStatus } from '@/utils/orderDisplay'

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const UNSUCCESSFUL_STATUSES = new Set(['cancelled', 'failed', 'refunded'])

const createOrderChartData = (orders) => {
  const byMonth = new Map()

  for (const order of orders) {
    const date = order.createdAt || order.date
    if (!date) continue

    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) continue

    const key = `${parsed.getFullYear()}-${parsed.getMonth()}`

    let entry = byMonth.get(key)
    if (!entry) {
      entry = {
        key,
        label: `${MONTH_NAMES[parsed.getMonth()]} ${String(parsed.getFullYear()).slice(2)}`,
        orders: 0,
        revenue: 0,
      }
      byMonth.set(key, entry)
    }

    entry.orders += 1

    if (!UNSUCCESSFUL_STATUSES.has(getOrderStatus(order))) {
      entry.revenue += Number(order.total || 0)
    }
  }

  return [...byMonth.values()]
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(({ label, orders, revenue }) => ({ month: label, orders, revenue }))
}

const getUserName = (user) => user?.name || user?.fullName || user?.username || null

const getCustomerName = (order, userMap) => {
  const user = userMap?.get(String(order?.userId ?? ''))
  const userName = user ? getUserName(user) : null
  if (userName) return userName
  if (order?.shippingAddress?.fullName) return order.shippingAddress.fullName
  return order?.userId != null ? `User #${order.userId}` : 'Guest'
}

const AdminDashboard = () => {
  const queryClient = useQueryClient()
  const { adminUser } = useAdminAuth()

  const prefetchProduct = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['admin-product', id],
      queryFn: () => productService.getById(id),
    })
  }

  const {
    data: productData,
    isPending: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ['admin-products', 'all'],
    queryFn: () => productService.getAll(),
  })

  const {
    data: userData,
    isPending: usersLoading,
    isError: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['admin-users'],
    queryFn: userService.getAll,
  })

  const {
    data: orders = [],
    isPending: ordersLoading,
    isError: ordersError,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: orderService.getAll,
  })

  const products = productData?.items ?? []
  const users = userData?.items ?? []

  const isLoading = productsLoading || usersLoading || ordersLoading

  const hasError = productsError || usersError || ordersError

  const handleRetry = () => {
    refetchProducts()
    refetchUsers()
    refetchOrders()
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <AdminLoading message="Loading Dashboard..." />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="p-6">
        <AdminError
          message="Unable to load dashboard data."
          onRetry={handleRetry}
        />
      </div>
    )
  }

  const totalProducts = productData?.totalCount ?? products.length

  const totalUsers = userData?.totalCount ?? users.length

  const totalOrders = orders.length

  const totalRevenue = orders.reduce(
    (total, order) => {
      return total + Number(order.total || 0)
    },
    0
  )

  const pendingOrders = orders.filter(
    (order) =>
      order.status === 'pending' ||
      order.orderStatus === 'pending'
  ).length

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock || 0) <= 5
  ).length

  const pendingCount = orders.filter(
    (order) => getOrderStatus(order) === 'pending'
  ).length

  const processingCount = orders.filter(
    (order) => getOrderStatus(order) === 'processing'
  ).length

  const shippedCount = orders.filter(
    (order) => getOrderStatus(order) === 'shipped'
  ).length

  const deliveredCount = orders.filter(
    (order) => getOrderStatus(order) === 'delivered'
  ).length

  const cancelledCount = orders.filter(
    (order) => getOrderStatus(order) === 'cancelled'
  ).length

  const deliveredRevenue = orders
    .filter(
      (order) => getOrderStatus(order) === 'delivered'
    )
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    )

  const orderChartData = createOrderChartData(orders)

  const orderStatusChartData = [
    { name: 'Pending', value: pendingCount },
    { name: 'Processing', value: processingCount },
    { name: 'Shipped', value: shippedCount },
    { name: 'Delivered', value: deliveredCount },
    { name: 'Cancelled', value: cancelledCount },
  ]

  const userMap = new Map((users || []).map((user) => [String(user.id), user]))

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5)

  const lowStockList = products
    .filter(
      (product) =>
        Number(product.stock || 0) <= 5
    )
    .slice(0, 5)

  const orderColumns = [
    {
      key: 'order',
      label: 'Order ID',
      render: (order) => (
        <span className="font-medium text-surface-900 dark:text-surface-100">
          {order.orderNumber || `#${order.id}`}
        </span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (order) => (
        <span className="text-surface-900 dark:text-surface-100">
          {getCustomerName(order, userMap)}
        </span>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (order) =>
        order.createdAt || order.date
          ? new Date(order.createdAt || order.date).toLocaleDateString('en-IN')
          : '—',
    },
    {
      key: 'total',
      label: 'Total',
      render: (order) => `₹${Number(order.total || 0).toLocaleString('en-IN')}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (order) => <StatusBadge status={order.orderStatus || order.status} />,
    },
  ]

  const productColumns = [
    {
      key: 'product',
      label: 'Product',
      render: (product) => (
        <span className="font-medium text-surface-900 dark:text-surface-100">
          {product.name}
        </span>
      ),
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (product) => product.stock ?? 0,
    },
    {
      key: 'price',
      label: 'Price',
      render: (product) => `₹${Number(product.price || 0).toLocaleString('en-IN')}`,
    },
    {
      key: 'action',
      label: 'Action',
      render: (product) => (
        <Link
          to={`/admin/products/${product.id}/edit`}
          onMouseEnter={() => prefetchProduct(product.id)}
          onFocus={() => prefetchProduct(product.id)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-700 transition-colors hover:border-surface-300 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
        >
          Edit
        </Link>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Welcome back,{' '}
          <span className="font-medium text-surface-700 dark:text-surface-200">
            {adminUser?.name || 'Admin'}
          </span>
          . Here&apos;s how your DevTech store is performing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Products"
          value={totalProducts}
          description="Products in catalog"
          icon={Package}
        />

        <StatCard
          title="Total Users"
          value={totalUsers}
          description="Registered users"
          icon={Users}
        />

        <StatCard
          title="Total Orders"
          value={totalOrders}
          description="Orders placed"
          icon={ShoppingBag}
        />

        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          description="Based on order totals"
          icon={IndianRupee}
        />

        

      
      </div>

      <div className="mt-6">
        <OrdersChart data={orderChartData} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OrderStatusChart data={orderStatusChartData} total={totalOrders} />

        
      </div>

     

      
      
    </div>
  )
}

export default AdminDashboard