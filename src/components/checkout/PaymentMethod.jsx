const PaymentMethod = ({ selectedMethod, onSelect }) => {
  const methods = [
    { id: 'razorpay', label: 'Razorpay (UPI / Card / Netbanking)' },
    { id: 'cod', label: 'Cash on Delivery' },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      {methods.map((method) => (
        <label
          key={method.id}
          className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${
            selectedMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={selectedMethod === method.id}
            onChange={() => onSelect(method.id)}
            className="text-blue-600"
          />
          <span>{method.label}</span>
        </label>
      ))}
    </div>
  )
}

export default PaymentMethod
