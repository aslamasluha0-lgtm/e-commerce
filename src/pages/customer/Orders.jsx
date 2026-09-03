import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '@/hooks/useOrders'
import { useAuth } from '@/hooks/useAuth'
import OrderCard from '@/components/order/OrderCard'
import { getOrderStatus } from '@/utils/orderDisplay'
import { Package, Search, RefreshCw } from 'lucide-react'

const STATUS_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
]

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Highest Amount', value: 'high' },
  { label: 'Lowest Amount', value: 'low' },
]

const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl border border-surface-200 bg-white p-5 dark:border-surface-800 dark:bg-surface-900">
    <div className="flex justify-between">
      <div className="space-y-2">
        <div className="h-4 w-32 rounded bg-surface-200 dark:bg-surface-700" />
        <div className="h-3 w-24 rounded bg-surface-200 dark:bg-surface-700" />
      </div>
      <div className="h-6 w-20 rounded-full bg-surface-200 dark:bg-surface-700" />
    </div>
    <div className="mt-4 flex gap-2">
      <div className="h-14 w-14 rounded-lg bg-surface-200 dark:bg-surface-700" />
      <div className="h-14 w-14 rounded-lg bg-surface-200 dark:bg-surface-700" />
    </div>
    <div className="mt-4 flex justify-between">
      <div className="space-y-2">
        <div className="h-3 w-16 rounded bg-surface-200 dark:bg-surface-700" />
        <div className="h-3 w-12 rounded bg-surface-200 dark:bg-surface-700" />
      </div>
      <div className="h-5 w-20 rounded bg-surface-200 dark:bg-surface-700" />
    </div>
  </div>
)

const Orders = () => {
  const { user } = useAuth()
  const { data: orders, isLoading, isError, error, refetch } = useOrders({ userId: user?.id })

  const [searchQuery, setSearchQuery] = useState('')
  const [statusTab, setStatusTab] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filteredOrders = useMemo(() => {
    if (!orders) return []

    let result = [...orders]

    if (statusTab !== 'all') {
      result = result.filter((o) => {
        const s = String(getOrderStatus(o)).toLowerCase()
        return s === statusTab
      })
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter((o) => {
        const orderNumber = String(o.orderNumber || o.id || '').toLowerCase()
        if (orderNumber.includes(q)) return true
        const hasMatch = o.items?.some(
          (item) =>
            item.name?.toLowerCase().includes(q) ||
            String(item.productId || item.id || '').includes(q)
        )
        return hasMatch
      })
    }

    result.sort((a, b) => {
      const aDate = new Date(a.createdAt || a.date || 0).getTime()
      const bDate = new Date(b.createdAt || b.date || 0).getTime()
      const aTotal = a.total ?? a.totalAmount ?? 0
      const bTotal = b.total ?? b.totalAmount ?? 0
      switch (sortBy) {
        case 'oldest':
          return aDate - bDate
        case 'high':
          return bTotal - aTotal
        case 'low':
          return aTotal - bTotal
        case 'newest':
        default:
          return bDate - aDate
      }
    })

    return result
  }, [orders, statusTab, sortBy, searchQuery])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 h-8 w-40 animate-pulse rounded bg-surface-200 dark:bg-surface-700" />
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-surface-900 dark:text-surface-50">
          My Orders
        </h1>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            Unable to load your orders.
          </p>
          <p className="mt-1 text-xs text-red-600/80 dark:text-red-400/80">
            {error?.message || 'Please try again later.'}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!orders?.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-surface-900 dark:text-surface-50">
          My Orders
        </h1>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-200 bg-white px-6 py-16 text-center shadow-soft dark:border-surface-800 dark:bg-surface-900">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-brand-100 blur-2xl opacity-60 dark:bg-brand-950" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 ring-1 ring-brand-100 dark:from-surface-800 dark:to-surface-900 dark:ring-surface-700">
              <Package className="h-9 w-9 text-brand-500 dark:text-brand-400" strokeWidth={1.5} />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
            No orders yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-surface-500 dark:text-surface-400">
            Start shopping to place your first order!
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-brand-700 hover:shadow-soft-md"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">My Orders</h1>
      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
        {orders.length} order{orders.length !== 1 ? 's' : ''} total
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400 dark:text-surface-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order number or product..."
            aria-label="Search orders"
            className="h-10 w-full rounded-xl border border-surface-200 bg-white pl-9 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-500"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort orders"
          className="h-10 rounded-xl border border-surface-200 bg-white px-3 text-sm text-surface-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex gap-1 overflow-x-auto pb-2" role="tablist">
        {STATUS_TABS.map((tab) => {
          const active = statusTab === tab.value
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={active}
              onClick={() => setStatusTab(tab.value)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-surface-200 bg-white px-6 py-12 text-center shadow-soft dark:border-surface-800 dark:bg-surface-900">
          <Package className="mx-auto h-10 w-10 text-surface-300 dark:text-surface-600" />
          <p className="mt-3 text-sm font-medium text-surface-900 dark:text-surface-100">
            No orders match your search
          </p>
          <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
            Try a different search term or filter.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
