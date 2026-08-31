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
        <h1 className="text-3xl font-bold">Coupons Management</h1>
        <Button>Add Coupon</Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {coupons?.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 font-mono">{coupon.code}</td>
                <td className="px-6 py-4">{coupon.discount}%</td>
                <td className="px-6 py-4">{coupon.expiry}</td>
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
