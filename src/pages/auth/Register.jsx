import { useNavigate, Link } from 'react-router-dom'
import RegisterForm from '@/components/auth/RegisterForm'
import { useAuth } from '@/hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const { register, loading, error } = useAuth()

  const handleSubmit = async (data) => {
    await register(data).then(() => {
      navigate('/')
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 py-12 px-4 dark:bg-surface-950">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-surface-900 dark:text-surface-50">
          Create Account
        </h1>
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-surface-200 dark:bg-surface-900 dark:border-surface-800">
          <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
          <p className="text-center mt-6 text-sm text-surface-500 dark:text-surface-400">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 hover:underline dark:text-brand-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
