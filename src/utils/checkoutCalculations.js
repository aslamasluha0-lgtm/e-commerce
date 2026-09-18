export const FREE_SHIPPING_THRESHOLD = 5000
export const FLAT_SHIPPING = 49
export const TAX_RATE = 0.10

export const calculateTotals = (items) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
  const tax = Math.round(subtotal * TAX_RATE)
  const total = subtotal + shipping + tax
  return { subtotal, shipping, tax, total }
}

export const generateOrderNumber = (date = new Date()) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = String(Math.floor(100 + Math.random() * 900))
  return `DEV-${y}${m}${d}-${rand}`
}

export const toPaisa = (amount) => Math.round(amount * 100)
