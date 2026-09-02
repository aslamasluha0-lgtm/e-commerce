import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-6xl font-bold text-gray-900 mb-4 dark:text-gray-100">404</h1>
      <p className="text-xl text-gray-600 mb-8 dark:text-gray-400">Page not found</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Home className="h-5 w-5" />
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
