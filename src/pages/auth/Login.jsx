import { useNavigate, useLocation, Link } from 'react-router-dom'
import LoginForm from '@/components/auth/LoginForm'
import { useAuth } from '@/hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading, error } = useAuth()

  const handleSubmit = async (data) => {
    await login(data).then(() => {
      const from = location.state?.from || '/'
      navigate(from, { replace: true })
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 py-12 px-4 dark:bg-surface-950">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-surface-900 dark:text-surface-50">
          Sign In
        </h1>
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-surface-200 dark:bg-surface-900 dark:border-surface-800">
          <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
          <p className="text-center mt-6 text-sm text-surface-500 dark:text-surface-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-600 hover:underline dark:text-brand-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
