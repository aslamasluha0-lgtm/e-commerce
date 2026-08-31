import { useSelector } from 'react-redux'
import ComparisonTable from './ComparisonTable'
import EmptyState from '@/components/common/EmptyState'
import { GitCompareArrows } from 'lucide-react'

const CompareProducts = () => {
  const { items } = useSelector((state) => state.compare)

  if (!items.length) {
    return (
      <EmptyState
        title="No products to compare"
        description="Add products to compare their features"
        icon={GitCompareArrows}
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <ComparisonTable products={items} />
    </div>
  )
}

export default CompareProducts
