import { Package } from 'lucide-react'

const EmptyState = ({ title, description, icon: Icon = Package, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Icon className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 text-center mb-4">{description}</p>
      )}
      {action}
    </div>
  )
}

export default EmptyState
