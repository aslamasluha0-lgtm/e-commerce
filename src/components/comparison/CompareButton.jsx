import { GitCompareArrows } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCompare, removeFromCompare } from '@/redux/slices/compareSlice'

const CompareButton = ({ product }) => {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.compare)
  const isComparing = items.some((item) => item.id === product.id)

  const toggleCompare = () => {
    if (isComparing) {
      dispatch(removeFromCompare(product.id))
    } else if (items.length < 4) {
      dispatch(addToCompare(product))
    }
  }

  return (
    <button
      onClick={toggleCompare}
      disabled={!isComparing && items.length >= 4}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors ${
        isComparing
          ? 'border-blue-600 bg-blue-50 text-blue-600'
          : 'border-gray-300 text-gray-600 hover:bg-gray-50'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <GitCompareArrows className="h-4 w-4" />
      {isComparing ? 'Remove' : 'Compare'}
    </button>
  )
}

export default CompareButton
