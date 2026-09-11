const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-surface-800 rounded-lg p-6 shadow-sm border border-surface-200 dark:border-surface-700">
      <h3 className="text-sm font-medium text-surface-500">{title}</h3>
      <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{value}</p>
    </div>
  )
}

export default StatCard
