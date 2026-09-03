import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingBag, PackageCheck, ArrowLeft } from 'lucide-react'
import AddressForm from '@/components/checkout/AddressForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import PaymentMethod from '@/components/checkout/PaymentMethod'
import RazorpayButton from '@/components/checkout/RazorpayButton'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import Button from '@/components/common/Button'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { useOrderQueries } from '@/queries/orderQueries'
import { clearBuyNowItem } from '@/redux/slices/checkoutSlice'
import { clearCart } from '@/redux/slices/cartSlice'
import { calculateTotals, generateOrderNumber } from '@/utils/checkoutCalculations'
import { formatCurrency } from '@/utils/formatCurrency'
import { addressSchema } from '@/utils/validators'

const emptyAddress = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
}

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { success } = useToast()
  const { useCreateOrder } = useOrderQueries()
  const createOrder = useCreateOrder()

  const { buyNowItem } = useSelector((state) => state.checkout)
  const { items: cartItems } = useSelector((state) => state.cart)

  const checkoutItems = buyNowItem
    ? [{ ...buyNowItem.product, quantity: buyNowItem.quantity }]
    : cartItems

  const orderNumber = useRef(generateOrderNumber()).current
  const finalizingOrderRef = useRef(false)

  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [shippingAddress, setShippingAddress] = useState(emptyAddress)
  const [shippingErrors, setShippingErrors] = useState({})
  const [paymentStatus, setPaymentStatus] = useState('idle')
  const [orderError, setOrderError] = useState('')

  if (!checkoutItems.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-100 text-brand-600 dark:bg-surface-800 dark:text-brand-400">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-surface-900 dark:text-surface-50">
          Your checkout is empty
        </h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          Add some products to your cart or use Buy Now to start your order.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <PackageCheck className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    )
  }

  const { subtotal, discount, shipping, tax, total } = calculateTotals(checkoutItems)

  const customer = {
    name: shippingAddress.fullName || user?.name || '',
    email: user?.email || '',
    phone: shippingAddress.phone || '',
  }

  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }))
    setShippingErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
    setOrderError('')
  }

  const validateShippingAddress = () => {
    const result = addressSchema.safeParse(shippingAddress)
    const nextErrors = {}
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (!nextErrors[issue.path[0]]) nextErrors[issue.path[0]] = issue.message
      })
    }
    setShippingErrors(nextErrors)
    const valid = Object.keys(nextErrors).length === 0
    if (!valid) {
      setStep(1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return valid
  }

  const buildShippingAddressDetail = () => ({
    fullName: shippingAddress.fullName,
    phone: shippingAddress.phone,
    addressLine1: shippingAddress.address,
    addressLine2: '',
    city: shippingAddress.city,
    state: shippingAddress.state,
    postalCode: shippingAddress.pincode,
    country: 'India',
  })

  const createApplicationOrder = async ({ method, paymentId }) => {
    if (finalizingOrderRef.current) return
    finalizingOrderRef.current = true
    setPaymentStatus('creating-order')
    setOrderError('')
    const now = new Date().toISOString()
    const isRazorpay = method === 'razorpay'

    const orderData = {
      userId: user?.id,
      orderNumber,
      items: checkoutItems.map((item) => ({
        id: item.id,
        productId: item.id,
        name: item.name,
        image: item.image || item.images?.[0],
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
      discount,
      shipping,
      tax,
      total,
      paymentMethod: method,
      paymentStatus: isRazorpay ? 'paid' : 'pending',
      paymentId: paymentId || null,
      orderStatus: 'processing',
      status: 'processing',
      shippingAddress: buildShippingAddressDetail(),
      date: now,
      createdAt: now,
      timeline: [{ status: 'placed', date: now, note: 'Order placed' }],
    }

    try {
      const order = await createOrder.mutateAsync(orderData)

      if (buyNowItem) {
        dispatch(clearBuyNowItem())
      } else {
        dispatch(clearCart())
      }

      setPaymentStatus('success')
      success('Order placed successfully!', `Order ${order.orderNumber} has been confirmed.`)
      navigate('/order-success', { state: { order }, replace: true })
      return { ok: true }
    } catch (err) {
      console.error('Order creation failed:', err)
      setPaymentStatus('error')
      setOrderError(
        isRazorpay
          ? 'Payment completed, but we could not save your order. Please contact support with your payment ID.'
          : "We couldn't place your order. Please try again."
      )
      return { ok: false }
    } finally {
      finalizingOrderRef.current = false
    }
  }

  const handleCodPlaceOrder = () => {
    if (paymentStatus === 'creating-order') return
    if (!validateShippingAddress()) return
    setStep(2)
    createApplicationOrder({ method: 'cod' })
  }

  const handleRazorpaySuccess = (paymentId) => {
    createApplicationOrder({ method: 'razorpay', paymentId })
  }

  const handleRazorpayValidate = () => {
    const valid = validateShippingAddress()
    if (valid) setStep(2)
    return valid
  }

  const orderProcessing = paymentStatus === 'creating-order'
  const orderErrorOccurred = paymentStatus === 'error' && !!orderError

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to={buyNowItem ? `/products/${checkoutItems[0].id}` : '/cart'}
        className="inline-flex items-center gap-2 text-sm font-medium text-surface-600 transition-colors hover:text-brand-700 dark:text-surface-300 dark:hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        {buyNowItem ? 'Back to Product' : 'Back to Cart'}
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl dark:text-surface-50">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
        {buyNowItem
          ? 'Direct checkout for this item.'
          : `${checkoutItems.length} item(s) in your cart.`}
      </p>

      <div className="mt-6 max-w-3xl">
        <CheckoutSteps currentStep={step} steps={['Shipping', 'Payment']} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div
            className={`rounded-2xl border bg-white p-6 dark:bg-surface-900 ${
              step === 1
                ? 'border-brand-500 ring-1 ring-brand-500/30'
                : 'border-surface-200 dark:border-surface-800'
            }`}
          >
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              1. Shipping Address
            </h2>
            <div className="mt-4">
              <AddressForm
                value={shippingAddress}
                onChange={handleAddressChange}
                errors={shippingErrors}
              />
            </div>
          </div>

          <div
            className={`rounded-2xl border bg-white p-6 dark:bg-surface-900 ${
              step === 2
                ? 'border-brand-500 ring-1 ring-brand-500/30'
                : 'border-surface-200 dark:border-surface-800'
            }`}
          >
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              2. Payment Details
            </h2>
            <div className="mt-4">
              <PaymentMethod selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
            </div>
          </div>
        </div>

        <div>
          <div className="lg:sticky lg:top-24">
            <OrderSummary items={checkoutItems} discount={discount}>
              <div className="mt-6 border-t border-surface-200 pt-6 dark:border-surface-800">
                {step === 2 && (
                  <p className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Shipping to: {shippingAddress.fullName}, {shippingAddress.address},{' '}
                    {shippingAddress.city} {shippingAddress.state} {shippingAddress.pincode}
                  </p>
                )}

                {paymentMethod === 'razorpay' ? (
                  <RazorpayButton
                    amount={total}
                    customer={customer}
                    description="DevTech Technology Store"
                    onSuccess={handleRazorpaySuccess}
                    onValidate={handleRazorpayValidate}
                    disabled={orderProcessing}
                  />
                ) : (
                  <Button
                    onClick={handleCodPlaceOrder}
                    loading={orderProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {orderProcessing ? 'Placing Order...' : `Place Order — ${formatCurrency(total)}`}
                  </Button>
                )}

                {orderErrorOccurred && (
                  <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                    {orderError}
                  </div>
                )}
              </div>
            </OrderSummary>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
