import { Check } from 'lucide-react'

const CheckoutSteps = ({ currentStep, steps = [] }) => {
  return (
    <ol className="flex w-full items-center">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isComplete = stepNumber < currentStep
        const isActive = stepNumber === currentStep
        const isLast = index === steps.length - 1

        return (
          <li key={step} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isComplete
                    ? 'bg-emerald-500 text-white'
                    : isActive
                      ? 'bg-brand-600 text-white ring-4 ring-brand-600/20'
                      : 'bg-surface-100 text-surface-400 dark:bg-surface-800 dark:text-surface-500'
                }`}
              >
                {isComplete ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              <span
                className={`mt-2 hidden text-xs font-medium sm:block ${
                  isActive
                    ? 'text-brand-700 dark:text-brand-300'
                    : isComplete
                      ? 'text-surface-700 dark:text-surface-200'
                      : 'text-surface-400 dark:text-surface-500'
                }`}
              >
                {step}
              </span>
            </div>
            {!isLast && (
              <div
                className={`mx-2 mb-0 h-0.5 flex-1 rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-surface-200 dark:bg-surface-700'} sm:mb-6`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default CheckoutSteps
