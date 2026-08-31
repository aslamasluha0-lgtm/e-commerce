const RazorpayButton = ({ amount, onSuccess }) => {
  const handlePayment = () => {
    // Future: Integrate Razorpay SDK here
    // For now, simulate payment success
    alert(`Razorpay payment of ₹${amount} will be integrated later.`)
    onSuccess?.({ payment_id: 'demo_payment_123' })
  }

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
      Pay with Razorpay
    </button>
  )
}

export default RazorpayButton
