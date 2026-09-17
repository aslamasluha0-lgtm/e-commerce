import AdminEmptyState from '@/components/admin/AdminEmptyState'

const TICK_FRACTIONS = [1, 0.75, 0.5, 0.25, 0]

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString('en-IN')}`

const formatCompactINR = (value) => {
  const amount = Math.round(Number(value || 0))
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(1).replace(/\.0$/, '')}Cr`
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(1).replace(/\.0$/, '')}L`
  }
  if (amount >= 1_000) {
    return `₹${Math.round(amount / 1_000)}k`
  }
  return `₹${amount}`
}

const ChartPanel = ({ title, data, valueKey, formatValue, formatTick, barClass }) => {
  const values = data.map((item) => Number(item[valueKey]) || 0)
  const max = Math.max(...values, 0)
  const total = values.reduce((sum, value) => sum + value, 0)

  return (
    <div className="rounded-xl bg-surface-50/70 p-4 dark:bg-surface-950/40">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100">
          {title}
        </h3>
        <p className="text-sm font-semibold text-surface-700 dark:text-surface-300">
          {formatValue(total)}
        </p>
      </div>

      <div className="flex gap-1.5 sm:gap-3">
        <div className="relative h-40 w-12 shrink-0 pr-1 text-right text-[10px] leading-none text-surface-500 dark:text-surface-400 sm:w-14 sm:text-[11px]">
          {TICK_FRACTIONS.map((fraction) => (
            <span
              key={fraction}
              className="absolute right-0"
              style={{ top: `${(1 - fraction) * 100}%`, transform: 'translateY(-50%)' }}
            >
              {formatTick(max * fraction)}
            </span>
          ))}
        </div>

        <div className="relative h-40 min-w-0 flex-1">
          {TICK_FRACTIONS.map((fraction) => (
            <div
              key={fraction}
              className="absolute inset-x-0 border-t border-dashed border-surface-200 dark:border-surface-800"
              style={{ top: `${(1 - fraction) * 100}%` }}
            />
          ))}

          <div className="absolute inset-0 flex items-end gap-1.5 sm:gap-3">
            {data.map((item) => {
              const value = Number(item[valueKey]) || 0
              const barHeight = max > 0 ? Math.max((value / max) * 82, value > 0 ? 3 : 0) : 0
              return (
                <div
                  key={item.month}
                  className="relative h-full w-full min-w-0 flex-1"
                >
                  <div
                    className={`absolute bottom-0 left-1/2 w-full max-w-9 -translate-x-1/2 rounded-t-md ${barClass}`}
                    style={{ height: `${barHeight}%` }}
                  />
                  <span
                    className="pointer-events-none absolute left-1/2 max-w-full -translate-x-1/2 truncate whitespace-nowrap text-[10px] font-medium leading-none text-surface-600 dark:text-surface-300 sm:text-[11px]"
                    style={{ bottom: `calc(${barHeight}% + 6px)` }}
                  >
                    {formatValue(value)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-2 flex gap-1.5 sm:gap-3">
        <div className="w-12 shrink-0 sm:w-14" />
        {data.map((item) => (
          <span
            key={item.month}
            className="w-full min-w-0 flex-1 truncate text-center text-[10px] font-medium text-surface-500 dark:text-surface-400 sm:text-[11px]"
          >
            {item.month}
          </span>
        ))}
      </div>
    </div>
  )
}

const OrdersChart = ({ data = [] }) => {
  const hasData = Array.isArray(data) && data.length > 0

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
          Sales Overview
        </h2>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Monthly orders and revenue
        </p>
      </div>

      {!hasData ? (
        <AdminEmptyState
          title="No sales data available."
          description="Orders will appear here once customers place orders."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartPanel
            title="Orders"
            data={data}
            valueKey="orders"
            formatValue={(value) => Math.round(value)}
            formatTick={(value) => Math.round(value)}
            barClass="bg-brand-500 dark:bg-brand-400"
          />
          <ChartPanel
            title="Revenue"
            data={data}
            valueKey="revenue"
            formatValue={formatINR}
            formatTick={formatCompactINR}
            barClass="bg-emerald-500 dark:bg-emerald-400"
          />
        </div>
      )}
    </div>
  )
}

export default OrdersChart