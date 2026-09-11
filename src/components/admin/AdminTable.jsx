const AdminTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
        <thead className="bg-surface-50 dark:bg-surface-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-surface-900 divide-y divide-surface-200 dark:divide-surface-700">
          {data?.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-surface-100"
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
