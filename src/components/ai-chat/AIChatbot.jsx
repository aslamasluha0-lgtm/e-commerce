import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI shopping assistant. How can I help you find the perfect developer tools today?",
    },
  ])

  const handleSendMessage = (message) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: 'user', content: message },
    ])
    // Future: Send to AI backend API
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'ai',
          content: "Thanks for your message! AI integration will be available soon.",
        },
      ])
    }, 1000)
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border flex flex-col z-50">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <ChatMessages messages={messages} />
          <ChatInput onSend={handleSendMessage} />
        </div>
      )}
    </>
  )
}

export default AIChatbot
