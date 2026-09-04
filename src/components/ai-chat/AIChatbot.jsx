import { useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const idCounter = useRef(1)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content:
        "Hi! I'm your AI shopping assistant. How can I help you find the perfect developer tools today?",
    },
  ])

  const handleSendMessage = (message) => {
    idCounter.current += 1
    const userMsg = { id: idCounter.current, type: 'user', content: message }
    setMessages((prev) => [...prev, userMsg])
    setTimeout(() => {
      idCounter.current += 1
      setMessages((prev) => [
        ...prev,
        {
          id: idCounter.current,
          type: 'ai',
          content: 'Thanks for your message! AI integration will be available soon.',
        },
      ])
    }, 1000)
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-6 right-6 bg-brand-600 text-white p-4 rounded-full shadow-soft-lg hover:bg-brand-700 transition-colors z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 left-0 sm:left-auto sm:bottom-6 sm:right-6 w-full sm:w-96 h-[75vh] sm:h-[500px] bg-white rounded-t-xl sm:rounded-2xl shadow-soft-lg border flex flex-col z-50 dark:bg-surface-900 dark:border-surface-700">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <ChatMessages messages={messages} />
          <ChatInput onSend={handleSendMessage} />
        </div>
      )}
    </>
  )
}

export default AIChatbot
