import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/redux/slices/cartSlice'

export const useCart = () => {
  const dispatch = useDispatch()
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart)

  const addItem = (product) => dispatch(addToCart(product))
  const removeItem = (productId) => dispatch(removeFromCart(productId))
  const updateItemQuantity = (id, quantity) => dispatch(updateQuantity({ id, quantity }))
  const emptyCart = () => dispatch(clearCart())

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    items,
    totalAmount,
    totalQuantity,
    addItem,
    removeItem,
    updateItemQuantity,
    emptyCart,
    getCartTotal,
    getCartCount,
  }
}
