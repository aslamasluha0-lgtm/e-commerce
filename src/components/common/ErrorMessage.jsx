import { AlertCircle } from 'lucide-react'

const ErrorMessage = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
      <p className="text-sm text-red-600">{message}</p>
    </div>
  )
}

export default ErrorMessage
