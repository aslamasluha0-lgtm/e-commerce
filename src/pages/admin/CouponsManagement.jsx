import { useQuery } from '@tanstack/react-query'
import { couponService } from '@/services/couponService'
import Button from '@/components/common/Button'
import Loader from '@/components/common/Loader'

const CouponsManagement = () => {
  const { data: coupons, isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: couponService.getAll,
  })

  if (isLoading) return <Loader className="py-20" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold dark:text-gray-100">Coupons Management</h1>
        <Button>Add Coupon</Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Expiry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {coupons?.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 font-mono dark:text-gray-100">{coupon.code}</td>
                <td className="px-6 py-4 dark:text-gray-200">{coupon.discount}%</td>
                <td className="px-6 py-4 dark:text-gray-200">{coupon.expiry}</td>
                <td className="px-6 py-4">
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CouponsManagement
