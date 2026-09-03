import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  Command,
  LogOut,
  UserCircle2,
  Package,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSelector } from 'react-redux'
import ThemeToggle from '@/components/common/ThemeToggle'
import { env } from '@/config/env'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
]

const appName = env.APP_NAME || 'DevStore'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  )
  const wishlistCount = useSelector((state) => state.wishlist.items.length)

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = searchQuery.trim()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (debouncedSearch) {
      navigate(`/products?q=${encodeURIComponent(debouncedSearch)}`)
    } else {
      navigate('/products')
    }
  }

  const isActive = (link) =>
    link.end ? location.pathname === link.to : location.pathname.startsWith(link.to)

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-surface-200/80 bg-surface-50/80 backdrop-blur-xl dark:border-surface-800 dark:bg-surface-950/80">
      {/* Top utility bar */}
      <div className="bg-surface-900 text-center text-xs text-surface-300 dark:bg-surface-950 dark:text-surface-400">
        <div className="mx-auto max-w-7xl px-4 py-1.5 sm:px-6 lg:px-8">
          Premium gear &amp; tools for developers — free shipping over ₹500
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile hamburger */}
          <button
            className="flex h-10 w-10 -ml-2 items-center justify-center rounded-lg text-surface-600 hover:bg-surface-100 lg:hidden dark:text-surface-300 dark:hover:bg-surface-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
              <Command className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="text-xl font-bold tracking-tight text-surface-900 dark:text-white">
              {appName}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(link)
                    ? 'text-brand-700 dark:text-brand-300'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search - desktop */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400 dark:text-surface-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laptops, keyboards, monitors…"
              aria-label="Search products"
              className="h-10 w-full rounded-full border border-surface-200 bg-white pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-500"
            />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            <div className="hidden items-center gap-1.5 md:flex">
              <Link
                to="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-surface-600 transition-colors hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white shadow">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                aria-label={`Cart, ${cartCount} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-surface-600 transition-colors hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white shadow">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="group relative hidden md:block">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-surface-700 transition-colors hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700"
                  aria-label="Account menu"
                >
                  <User className="h-5 w-5" />
                </button>
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-52 origin-top-right scale-95 rounded-xl border border-surface-200 bg-white p-1.5 opacity-0 shadow-soft-lg transition-all duration-150 group-hover:visible group-hover:scale-100 group-hover:opacity-100 focus-within:visible focus-within:scale-100 focus-within:opacity-100 dark:border-surface-700 dark:bg-surface-900">
                  <div className="border-b border-surface-100 px-3 py-2.5 dark:border-surface-800">
                    <p className="truncate text-sm font-medium text-surface-900 dark:text-surface-100">
                      {user?.name || 'Account'}
                    </p>
                    <p className="truncate text-xs text-surface-500 dark:text-surface-400">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to="/account/profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
                  >
                    <UserCircle2 className="h-4 w-4" /> Profile
                  </Link>
                  <Link
                    to="/account/orders"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
                  >
                    <Package className="h-4 w-4" /> My Orders
                  </Link>
                  <Link
                    to="/account/wishlist"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
                  >
                    <Heart className="h-4 w-4" /> Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex h-10 items-center rounded-full bg-brand-600 px-5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                Sign in
              </Link>
            )}

            {/* Mobile cart */}
            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-surface-600 transition-colors hover:bg-surface-100 md:hidden dark:text-surface-300 dark:hover:bg-surface-800"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative pb-3 md:hidden"
        >
          <Search className="pointer-events-none absolute left-3.5 top-5 h-4 w-4 -translate-y-1/2 text-surface-400 dark:text-surface-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="h-10 w-full rounded-full border border-surface-200 bg-white pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-500"
          />
        </form>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-200 dark:border-surface-800">
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
            >
              Products
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
            >
              Categories
            </Link>
            <div className="my-2 border-t border-surface-100 dark:border-surface-800" />
            <div className="flex items-center justify-between px-3">
              <span className="text-sm font-medium text-surface-500 dark:text-surface-400">
                Theme
              </span>
              <ThemeToggle />
            </div>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
            >
              <span>Wishlist</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            </Link>
            <Link
              to="/account/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
            >
              {isAuthenticated ? 'Profile' : 'Sign in'}
            </Link>
            {isAuthenticated && (
              <Link
                to="/account/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
              >
                My Orders
              </Link>
            )}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
