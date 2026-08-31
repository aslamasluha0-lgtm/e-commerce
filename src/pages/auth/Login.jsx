import { useNavigate, Link } from 'react-router-dom'
import LoginForm from '@/components/auth/LoginForm'
import { useAuth } from '@/hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()

  const handleSubmit = async (data) => {
    try {
      await login(data)
      navigate('/')
    } catch (err) {
      // Error handled by useAuth hook
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
          <p className="text-center mt-6 text-sm text-gray-600">
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
