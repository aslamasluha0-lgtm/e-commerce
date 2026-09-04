const PaymentMethod = ({ selectedMethod, onSelect }) => {
  const methods = [
    { id: 'razorpay', label: 'Razorpay (UPI / Card / Netbanking)' },
    { id: 'cod', label: 'Cash on Delivery' },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Payment Method</h3>
      {methods.map((method) => (
        <label
          key={method.id}
          className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
            selectedMethod === method.id
              ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/40 dark:border-brand-700'
              : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={selectedMethod === method.id}
            onChange={() => onSelect(method.id)}
            className="accent-brand-600"
          />
          <span className="text-surface-700 dark:text-surface-200">{method.label}</span>
        </label>
      ))}
    </div>
  )
}

export default PaymentMethod
