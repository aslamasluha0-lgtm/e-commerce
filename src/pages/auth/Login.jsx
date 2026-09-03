import { useNavigate, useLocation, Link } from 'react-router-dom'
import LoginForm from '@/components/auth/LoginForm'
import { useAuth } from '@/hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading, error } = useAuth()

  const handleSubmit = async (data) => {
    try {
      await login(data)
      const from = location.state?.from || '/'
      navigate(from, { replace: true })
    } catch (err) {
      // Error handled by useAuth hook
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">Sign In</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
          <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
