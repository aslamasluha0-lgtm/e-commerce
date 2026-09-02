import { useUserQueries } from '@/queries/userQueries'
import Loader from '@/components/common/Loader'

const UsersManagement = () => {
  const { useAllUsers } = useUserQueries()
  const { data: users, isLoading } = useAllUsers({ _limit: 50 })

  if (isLoading) return <Loader className="py-20" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Users Management</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 font-medium dark:text-gray-100">{user.name}</td>
                <td className="px-6 py-4 dark:text-gray-200">{user.email}</td>
                <td className="px-6 py-4 capitalize dark:text-gray-200">{user.role || 'customer'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersManagement
