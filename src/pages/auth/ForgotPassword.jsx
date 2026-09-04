import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

const ForgotPassword = () => {
  const { success } = useToast()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    success('Reset link sent', `If an account exists for ${email}, you will receive a password reset link.`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 py-12 px-4 dark:bg-surface-950">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-surface-900 dark:text-surface-50">
          Forgot Password
        </h1>
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-surface-200 dark:bg-surface-900 dark:border-surface-800">
          {submitted ? (
            <div className="text-center">
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                If an account exists with <strong>{email}</strong>, you'll receive a password reset link shortly.
              </p>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
          ) : (
            <>
              <p className="text-surface-600 text-center mb-6 dark:text-surface-300">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            </>
          )}
          <p className="text-center mt-6 text-sm text-surface-500 dark:text-surface-400">
            Remember your password?{' '}
            <Link to="/login" className="text-brand-600 hover:underline dark:text-brand-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
