const SuggestedQuestions = ({ onSelect }) => {
  const questions = [
    'What are the best laptops for developers?',
    'Recommend a mechanical keyboard',
    'Compare RTX 4070 vs RX 7800 XT',
    'Best budget monitors for coding',
  ]

  return (
    <div className="px-4 pb-2">
      <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="text-xs px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SuggestedQuestions
