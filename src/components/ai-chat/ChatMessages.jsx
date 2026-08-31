import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'

const ChatMessages = ({ messages, isTyping }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  )
}

export default ChatMessages
