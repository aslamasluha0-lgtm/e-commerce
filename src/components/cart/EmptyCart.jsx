import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmptyState from '@/components/common/EmptyState'
import Button from '@/components/common/Button'

const EmptyCart = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-surface-200 bg-white p-8 dark:border-surface-800 dark:bg-surface-900">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Explore our collection to find the right gear for your setup."
          action={
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          }
        />
      </div>
    </div>
  )
}

export default EmptyCart
