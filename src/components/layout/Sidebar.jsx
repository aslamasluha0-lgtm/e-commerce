import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { setSidebarOpen } from '@/redux/slices/uiSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state) => state.ui)

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => dispatch(setSidebarOpen(false))} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => dispatch(setSidebarOpen(false))}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4 space-y-3">
              <Link to="/" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => dispatch(setSidebarOpen(false))}>Home</Link>
              <Link to="/products" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => dispatch(setSidebarOpen(false))}>Products</Link>
              <Link to="/categories" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => dispatch(setSidebarOpen(false))}>Categories</Link>
              <Link to="/cart" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => dispatch(setSidebarOpen(false))}>Cart</Link>
              <Link to="/wishlist" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => dispatch(setSidebarOpen(false))}>Wishlist</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
