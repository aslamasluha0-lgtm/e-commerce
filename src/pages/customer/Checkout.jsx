import { useState } from 'react'
import AddressForm from '@/components/checkout/AddressForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import PaymentMethod from '@/components/checkout/PaymentMethod'
import RazorpayButton from '@/components/checkout/RazorpayButton'
import Button from '@/components/common/Button'

const Checkout = () => {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [address, setAddress] = useState(null)

  const handleAddressSubmit = (data) => {
    setAddress(data)
    setStep(2)
  }

  const handlePaymentSuccess = (paymentData) => {
    // Future: Send order to backend
    console.log('Payment successful:', paymentData)
    alert('Order placed successfully!')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className={`bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800 ${step === 1 ? 'ring-2 ring-blue-600' : ''}`}>
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">1. Shipping Address</h2>
            <AddressForm onSubmit={handleAddressSubmit} />
          </div>

          <div className={`bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800 ${step === 2 ? 'ring-2 ring-blue-600' : ''}`}>
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">2. Payment Method</h2>
            <PaymentMethod selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
          </div>

          {step === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">3. Complete Order</h2>
              {paymentMethod === 'razorpay' ? (
                <RazorpayButton amount={0} onSuccess={handlePaymentSuccess} />
              ) : (
                <Button onClick={handlePaymentSuccess} className="w-full">
                  Place Order (Cash on Delivery)
                </Button>
              )}
            </div>
          )}
        </div>

        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default Checkout
