import { useState } from 'react'
import { Send } from 'lucide-react'

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message.trim())
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}

export default ChatInput
