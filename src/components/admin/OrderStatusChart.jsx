import { useState } from 'react'
import AdminEmptyState from '@/components/admin/AdminEmptyState'

const STATUS_COLORS = {
  Pending: '#f59e0b',
  Processing: '#6366f1',
  Shipped: '#a855f7',
  Delivered: '#10b981',
  Cancelled: '#ef4444',
}

const FALLBACK_COLOR = '#94a3b8'

const SIZE = 180
const RADIUS = 72
const STROKE = 24
const PATH_LENGTH = 100

const getColor = (name) => STATUS_COLORS[name] || FALLBACK_COLOR

const formatPercent = (value, total) => {
  if (!total || Number(value) <= 0) return 0
  return Math.round((Number(value) / total) * 1000) / 10
}

const OrderStatusChart = ({ data = [], total = 0 }) => {
  const [activeName, setActiveName] = useState(null)

  const rows = Array.isArray(data) ? data : []
  const totalOrders = Number(total) || 0
  const visible = rows.filter((row) => Number(row.value) > 0)
  const totalVisible = visible.reduce((sum, row) => sum + Number(row.value), 0)

  const active = rows.find((row) => row.name === activeName) || null

  const segments = visible.reduce((acc, row, index) => {
    const value = Number(row.value)
    const fraction = value / totalVisible
    const cumulative = index > 0 ? acc[index - 1].cumulative : 0
    acc.push({
      name: row.name,
      value,
      dash: fraction * PATH_LENGTH,
      rotation: (cumulative / totalVisible) * 360 - 90,
      cumulative: cumulative + value,
    })
    return acc
  }, [])

  if (rows.length === 0 || totalOrders === 0) {
    return (
      <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
          Order Status Distribution
        </h2>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Breakdown of orders by status
        </p>
        <div className="mt-4">
          <AdminEmptyState
            title="No order data available."
            description="Orders will appear here once customers place orders."
          />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
      <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
        Order Status Distribution
      </h2>
      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
        Breakdown of orders by status
      </p>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-44 w-44"
            role="img"
            aria-label="Donut chart showing the distribution of order statuses"
          >
            {segments.map((segment) => {
              const isDim = activeName !== null && activeName !== segment.name

              return (
                <circle
                  key={segment.name}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={getColor(segment.name)}
                  strokeWidth={STROKE}
                  pathLength={PATH_LENGTH}
                  strokeDasharray={`${segment.dash} ${PATH_LENGTH - segment.dash}`}
                  transform={`rotate(${segment.rotation} ${SIZE / 2} ${SIZE / 2})`}
                  className={`cursor-pointer transition-opacity duration-150 ${isDim ? 'opacity-35' : 'opacity-100'}`}
                  onMouseEnter={() => setActiveName(segment.name)}
                  onMouseLeave={() => setActiveName(null)}
                  onFocus={() => setActiveName(segment.name)}
                  onBlur={() => setActiveName(null)}
                  tabIndex={0}
                  aria-label={`${segment.name}: ${segment.value} orders, ${formatPercent(segment.value, totalOrders)}% of total`}
                />
              )
            })}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold leading-none text-surface-900 dark:text-white">
              {totalOrders.toLocaleString('en-IN')}
            </span>
            <span className="mt-1.5 text-xs font-medium text-surface-500 dark:text-surface-400">
              Total Orders
            </span>
          </div>

          {active && Number(active.value) > 0 && (
            <div className="pointer-events-none absolute left-1/2 top-2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-center shadow-card dark:border-surface-700 dark:bg-surface-800">
              <p className="text-xs font-semibold leading-tight text-surface-900 dark:text-surface-100">
                {active.name}
              </p>
              <p className="text-xs leading-tight text-surface-500 dark:text-surface-400">
                {active.value} {active.value === 1 ? 'order' : 'orders'} ·{' '}
                {formatPercent(Number(active.value), totalOrders)}%
              </p>
            </div>
          )}
        </div>

        <div className="w-full sm:flex-1">
          {rows.map((row) => {
            const value = Number(row.value)
            const percent = formatPercent(value, totalOrders)

            return (
              <div
                key={row.name}
                onMouseEnter={() => setActiveName(row.name)}
                onMouseLeave={() => setActiveName(null)}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: getColor(row.name) }}
                  />
                  <span className="text-sm text-surface-600 dark:text-surface-300">
                    {row.name}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  {value > 0 && (
                    <span className="text-xs text-surface-400 dark:text-surface-500">
                      {percent}%
                    </span>
                  )}
                  <span className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                    {value}
                  </span>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrderStatusChart