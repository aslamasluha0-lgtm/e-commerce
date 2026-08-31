import { useState } from 'react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

const Addresses = () => {
  const [addresses] = useState([])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <Button>Add New Address</Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="font-medium">{address.fullName}</p>
              <p className="text-gray-600 text-sm">{address.address}</p>
              <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.pincode}</p>
              <p className="text-gray-600 text-sm">{address.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Addresses
