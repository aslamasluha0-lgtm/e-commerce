import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/redux/slices/cartSlice'
import { calculateTotals } from '@/utils/checkoutCalculations'

export const useCart = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)

  const addItem = (product) => dispatch(addToCart(product))
  const removeItem = (productId) => dispatch(removeFromCart(productId))
  const updateItemQuantity = (id, quantity) => dispatch(updateQuantity({ id, quantity }))
  const emptyCart = () => dispatch(clearCart())

  const getCartTotal = () => calculateTotals(items).total

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    emptyCart,
    getCartTotal,
    getCartCount,
  }
}
