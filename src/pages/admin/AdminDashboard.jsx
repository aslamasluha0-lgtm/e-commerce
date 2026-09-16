import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { productService } from '@/services/productService'
import { userService } from '@/services/userService'
import { orderService } from '@/services/orderService'
import StatCard from '@/components/admin/StatCard'
import AdminTable from '@/components/admin/AdminTable'
import AdminLoading from '@/components/admin/AdminLoading'
import AdminError from '@/components/admin/AdminError'
import StatusBadge from '@/components/admin/StatusBadge'
import OrderStatusSummary from '@/components/admin/OrderStatusSummary'
import { getOrderStatus } from '@/utils/orderDisplay'

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
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Overview of your DevTech store.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Products"
          value={totalProducts}
          description="Products in catalog"
        />

        <StatCard
          title="Total Users"
          value={totalUsers}
          description="Registered users"
        />

        <StatCard
          title="Total Orders"
          value={totalOrders}
          description="Orders placed"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          description="Based on order totals"
        />

        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          description="Orders requiring attention"
        />

        <StatCard
          title="Low Stock"
          value={lowStockProducts}
          description="Products with 5 or fewer items"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              Recent Orders
            </h2>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-700 transition-colors hover:border-surface-300 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
            >
              View All Orders
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-8 text-center text-sm text-surface-500 dark:text-surface-400">
              No recent orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <AdminTable columns={orderColumns} data={recentOrders} />
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              Low Stock Products
            </h2>
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-700 transition-colors hover:border-surface-300 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
            >
              View All Products
            </Link>
          </div>

          {lowStockList.length === 0 ? (
            <div className="py-8 text-center text-sm text-surface-500 dark:text-surface-400">
              No low-stock products.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <AdminTable columns={productColumns} data={lowStockList} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
        <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-100">
          Order Status Summary
        </h2>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex-1">
            <OrderStatusSummary
              pending={pendingCount}
              processing={processingCount}
              shipped={shippedCount}
              delivered={deliveredCount}
              cancelled={cancelledCount}
            />
          </div>

          <div className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40 lg:w-72">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Delivered Revenue
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              ₹{deliveredRevenue.toLocaleString('en-IN')}
            </p>
            <p className="mt-1 text-xs text-emerald-700/70 dark:text-emerald-300/70">
              Based on delivered order totals
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard