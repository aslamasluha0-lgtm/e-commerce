import { useNavigate, Link } from 'react-router-dom'
import RegisterForm from '@/components/auth/RegisterForm'
import { useAuth } from '@/hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const { register, loading, error } = useAuth()

  const handleSubmit = async (data) => {
    try {
      await register(data)
      navigate('/')
    } catch (err) {
      // Error handled by useAuth hook
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">Create Account</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
          <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
