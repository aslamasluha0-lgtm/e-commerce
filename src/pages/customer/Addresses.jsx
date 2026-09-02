import { useState } from 'react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

const Addresses = () => {
  const [addresses] = useState([])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold dark:text-gray-100">My Addresses</h1>
        <Button>Add New Address</Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white p-4 rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700">
              <p className="font-medium dark:text-gray-100">{address.fullName}</p>
              <p className="text-gray-600 text-sm dark:text-gray-400">{address.address}</p>
              <p className="text-gray-600 text-sm dark:text-gray-400">{address.city}, {address.state} {address.pincode}</p>
              <p className="text-gray-600 text-sm dark:text-gray-400">{address.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Addresses
