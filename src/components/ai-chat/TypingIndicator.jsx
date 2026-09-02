const TypingIndicator = () => {
  return (
    <div className="flex gap-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs">AI</span>
      </div>
      <div className="bg-gray-100 rounded-lg p-3 dark:bg-gray-800">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
