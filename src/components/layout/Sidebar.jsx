import { Link } from 'react-router-dom'
import { X, ShieldCheck } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { setSidebarOpen } from '@/redux/slices/uiSlice'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/cart', label: 'Cart' },
  { to: '/wishlist', label: 'Wishlist' },
]

const Sidebar = () => {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state) => state.ui)

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => dispatch(setSidebarOpen(false))}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-surface-50 shadow-soft-lg animate-slide-in-left dark:bg-surface-900">
            <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100">
                  DevStore
                </h2>
              </div>
              <button
                onClick={() => dispatch(setSidebarOpen(false))}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-500 transition-colors hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 p-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => dispatch(setSidebarOpen(false))}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-100 hover:text-brand-700 dark:text-surface-200 dark:hover:bg-surface-800 dark:hover:text-brand-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
