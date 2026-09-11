const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
      <div className="w-full max-w-md bg-white dark:bg-surface-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-surface-900 dark:text-white mb-2">
          DevTech Admin
        </h1>
        <p className="text-center text-surface-500 mb-6">Sign in to admin panel</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-900"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
