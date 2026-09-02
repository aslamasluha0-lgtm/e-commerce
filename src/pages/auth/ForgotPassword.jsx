import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">Forgot Password</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
          <p className="text-gray-600 text-center mb-6 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
