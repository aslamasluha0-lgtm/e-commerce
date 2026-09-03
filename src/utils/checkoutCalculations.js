export const FREE_SHIPPING_THRESHOLD = 500
export const FLAT_SHIPPING = 49
export const TAX_RATE = 0.18

export const calculateTotals = (items, discount = 0) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping =
    subtotal === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
  const tax = Math.round(subtotal * TAX_RATE)
  const total = subtotal - discount + shipping + tax
  return { subtotal, discount, shipping, tax, total }
}

export const generateOrderNumber = (date = new Date()) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = String(Math.floor(100 + Math.random() * 900))
  return `DEV-${y}${m}${d}-${rand}`
}

export const toPaisa = (amount) => Math.round(amount * 100)
