import { useParams } from 'react-router-dom'

const AdminProductEdit = () => {
  const { id } = useParams()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
        Edit Product #{id}
      </h1>
      <p className="mt-2 text-surface-600 dark:text-surface-400">
        Product edit form will be implemented later.
      </p>
    </div>
  )
}

export default AdminProductEdit
