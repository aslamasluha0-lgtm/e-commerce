import { useState } from 'react'
import { Loader2, Lock, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/utils/formatCurrency'
import { openRazorpayCheckout } from '@/services/paymentService'

const RazorpayButton = ({
  amount,
  customer = {},
  description,
  onSuccess,
  onValidate,
  disabled = false,
}) => {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handlePayment = async () => {
    if (status === 'opening' || status === 'finalizing') return

    if (onValidate && typeof onValidate === 'function') {
      const valid = onValidate()
      if (!valid) return
    }

    setStatus('opening')
    setMessage('')

    try {
      const result = await openRazorpayCheckout({
        amount,
        customerName: customer.name,
        email: customer.email,
        contact: customer.phone,
        description,
      })

      if (result.status === 'success') {
        setStatus('finalizing')
        setMessage('')
        if (onSuccess) {
          await onSuccess(result.paymentId)
        }
        setStatus('idle')
      } else if (result.status === 'cancelled') {
        setStatus('idle')
        setMessage('Payment cancelled. You can try again whenever you\u2019re ready.')
      } else {
        setStatus('idle')
        setMessage('Payment failed. Your order has not been placed. Please try again.')
      }
    } catch (err) {
      console.error('Razorpay error:', err)
      setStatus('idle')
      setMessage(err?.message || 'Payment service is currently unavailable. Please try again.')
    }
  }

  const label = status === 'opening' ? 'Opening Payment...' : status === 'finalizing' ? 'Confirming Order...' : null

  return (
    <div>
      <button
        type="button"
        onClick={handlePayment}
        disabled={disabled || status === 'opening' || status === 'finalizing' || amount <= 0}
        aria-label={`Pay ${formatCurrency(amount)} with Razorpay`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-medium text-white shadow-soft transition-all duration-200 hover:bg-brand-700 hover:shadow-soft-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] dark:focus-visible:ring-offset-surface-950"
      >
        {label ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {label}
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay {formatCurrency(amount)}
          </>
        )}
      </button>

      {status === 'error' && message && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {status === 'idle' && message && (
        <p className="mt-3 flex items-start gap-2 text-sm text-surface-500 dark:text-surface-400">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {message}
        </p>
      )}
    </div>
  )
}

export default RazorpayButton
