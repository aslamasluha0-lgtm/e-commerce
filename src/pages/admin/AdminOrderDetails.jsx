import { useParams } from 'react-router-dom'

const AdminOrderDetails = () => {
  const { id } = useParams()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
        Order Details #{id}
      </h1>
      <p className="mt-2 text-surface-600 dark:text-surface-400">
        Order details will be implemented later.
      </p>
    </div>
  )
}

export default AdminOrderDetails
