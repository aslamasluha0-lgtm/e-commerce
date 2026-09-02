import { useAuth } from '@/hooks/useAuth'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">My Profile</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
            <p className="mt-1 text-lg dark:text-gray-100">{user?.name || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
            <p className="mt-1 text-lg dark:text-gray-100">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
            <p className="mt-1 text-lg dark:text-gray-100">{user?.phone || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
            <p className="mt-1 text-lg capitalize dark:text-gray-100">{user?.role || 'customer'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
