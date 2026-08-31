import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  )
  const wishlistCount = useSelector((state) => state.wishlist.items.length)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            DevStore
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/wishlist" className="relative text-gray-600 hover:text-gray-900">
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  <User className="h-6 w-6" />
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-gray-900 text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/products" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link to="/categories" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
            <Link to="/cart" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            <Link to="/wishlist" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false) }} className="block text-gray-600 hover:text-gray-900">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
