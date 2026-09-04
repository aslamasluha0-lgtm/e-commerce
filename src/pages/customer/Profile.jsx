import { useAuth } from '@/hooks/useAuth'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-50 mb-8">
        My Profile
      </h1>
      <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-soft dark:border-surface-800 dark:bg-surface-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-surface-500 dark:text-surface-400">
              Name
            </label>
            <p className="mt-1 text-lg text-surface-900 dark:text-surface-100">
              {user?.name || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-500 dark:text-surface-400">
              Email
            </label>
            <p className="mt-1 text-lg text-surface-900 dark:text-surface-100">
              {user?.email || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-500 dark:text-surface-400">
              Phone
            </label>
            <p className="mt-1 text-lg text-surface-900 dark:text-surface-100">
              {user?.phone || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-500 dark:text-surface-400">
              Role
            </label>
            <p className="mt-1 text-lg capitalize text-surface-900 dark:text-surface-100">
              {user?.role || 'customer'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
