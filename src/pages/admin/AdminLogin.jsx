import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { ShieldCheck } from 'lucide-react'
import { loginSchema } from '@/utils/validators'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

const AdminLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAdminAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async ({ email, password }) => {
    try {
      await login({ email, password })
      toast.success('Welcome back, admin')
      const from = location.state?.from || '/admin'
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
      <div className="w-full max-w-md rounded-2xl border border-surface-200 bg-white p-8 shadow-card dark:border-surface-800 dark:bg-surface-800">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white">
            DevTech Admin
          </h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Sign in to admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

       
      </div>
    </div>
  )
}

export default AdminLogin