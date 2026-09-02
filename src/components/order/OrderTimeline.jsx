import { formatDate } from '@/utils/formatDate'

const OrderTimeline = ({ events = [] }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            {index < events.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700" />}
          </div>
          <div className="pb-4">
            <p className="font-medium text-gray-900 dark:text-gray-100">{event.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(event.date)}</p>
            {event.description && (
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderTimeline
