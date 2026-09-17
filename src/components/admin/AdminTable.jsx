const AdminTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-800">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-200 bg-white dark:divide-surface-800 dark:bg-surface-900">
          {data?.map((row, index) => (
            <tr
              key={row.id || index}
              className="transition-colors duration-150 hover:bg-surface-50 dark:hover:bg-surface-800/50"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="whitespace-nowrap px-6 py-4 text-sm text-surface-900 dark:text-surface-100"
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable