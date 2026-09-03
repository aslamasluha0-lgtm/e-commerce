import { env } from '@/config/env'
import { toPaisa } from '@/utils/checkoutCalculations'

const CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'
const SCRIPT_TIMEOUT = 15000

const loadRazorpayScript = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve()

    let script = document.querySelector(`script[src="${CHECKOUT_SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = CHECKOUT_SRC
      script.async = true
      document.body.appendChild(script)
    }

    const timeout = setTimeout(() => {
      script.removeEventListener('load', onLoad)
      script.removeEventListener('error', onError)
      reject(new Error('Razorpay SDK failed to load. Check your internet connection and reload.'))
    }, SCRIPT_TIMEOUT)

    const onLoad = () => {
      clearTimeout(timeout)
      if (window.Razorpay) resolve()
      else reject(new Error('Razorpay SDK loaded but is unavailable.'))
    }
    const onError = () => {
      clearTimeout(timeout)
      reject(new Error('Unable to load Razorpay. Please try again later.'))
    }

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)
  })

/**
 * Opens the Razorpay Checkout popup in Test Mode.
 *
 * @param {Object} params
 * @param {number} params.amount - Total amount in rupees.
 * @param {string} [params.customerName] - Prefill name.
 * @param {string} [params.email] - Prefill email.
 * @param {string} [params.contact] - Prefill phone.
 * @param {string} [params.description] - Checkout description.
 * @param {(response: any) => void} [params.onSuccess] - Optional success callback.
 * @param {(error: any) => void} [params.onFailure] - Optional failure callback.
 * @param {() => void} [params.onCancel] - Optional cancel callback.
 * @returns {Promise<{status: 'success', paymentId: string} | {status: 'cancelled'} | {status: 'failed'}>}
 */
export const openRazorpayCheckout = async ({
  amount,
  customerName,
  email,
  contact,
  description = 'DevTech Technology Store',
  onSuccess,
  onFailure,
  onCancel,
}) => {
  if (!env.RAZORPAY_KEY_ID) {
    throw new Error('Razorpay payment is not configured. Please set VITE_RAZORPAY_KEY_ID.')
  }

  await loadRazorpayScript()

  return new Promise((resolve) => {
    const options = {
      key: env.RAZORPAY_KEY_ID,
      amount: toPaisa(amount),
      currency: 'INR',
      name: env.APP_NAME || 'DevTech',
      description,
      prefill: {
        name: customerName || '',
        email: email || '',
        contact: contact || '',
      },
      theme: { color: '#2563eb' },
      handler: (response) => {
        const paymentId = response?.razorpay_payment_id
        onSuccess?.(response)
        resolve({ status: 'success', paymentId })
      },
      modal: {
        ondismiss: () => {
          onCancel?.()
          resolve({ status: 'cancelled' })
        },
      },
    }

    let rzp
    try {
      rzp = new window.Razorpay(options)
    } catch (error) {
      onFailure?.(error)
      return resolve({ status: 'failed' })
    }

    rzp.on('payment.failed', (response) => {
      onFailure?.(response)
      resolve({ status: 'failed' })
    })

    rzp.open()
  })
}
