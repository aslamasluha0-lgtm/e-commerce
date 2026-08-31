import { Bot, User } from 'lucide-react'

const ChatMessage = ({ message }) => {
  const isAI = message.type === 'ai'

  return (
    <div className={`flex gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isAI
            ? 'bg-gray-100 text-gray-800'
            : 'bg-blue-600 text-white'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
      {!isAI && (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-gray-600" />
        </div>
      )}
    </div>
  )
}

export default ChatMessage
