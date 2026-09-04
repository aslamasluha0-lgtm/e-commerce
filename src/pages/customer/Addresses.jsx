import { useRef, useState } from 'react'
import { MapPin, Plus, Pencil, Trash2, X } from 'lucide-react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { storage } from '@/utils/storage'
import { addressSchema } from '@/utils/validators'

const ADDRESS_STORAGE_KEY = 'devstore_addresses'

const emptyAddress = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
}

const Addresses = () => {
  const { user } = useAuth()
  const { success } = useToast()
  const idCounter = useRef(1)
  const [addresses, setAddresses] = useState(() => {
    const all = storage.get(ADDRESS_STORAGE_KEY) || {}
    return all[String(user?.id)] || []
  })
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyAddress)
  const [errors, setErrors] = useState({})

  const persistAddresses = (newAddresses) => {
    setAddresses(newAddresses)
    const all = storage.get(ADDRESS_STORAGE_KEY) || {}
    all[String(user?.id)] = newAddresses
    storage.set(ADDRESS_STORAGE_KEY, all)
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validate = () => {
    const result = addressSchema.safeParse(form)
    const nextErrors = {}
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (!nextErrors[issue.path[0]]) nextErrors[issue.path[0]] = issue.message
      })
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    if (editingId) {
      const updated = addresses.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      persistAddresses(updated)
      success('Address updated', 'Your address has been updated.')
    } else {
      idCounter.current += 1
      const newAddress = {
        ...form,
        id: `addr-${idCounter.current}`,
      }
      persistAddresses([...addresses, newAddress])
      success('Address added', 'New address has been saved.')
    }

    resetForm()
  }

  const handleEdit = (address) => {
    setEditingId(address.id)
    setForm({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    })
    setShowForm(true)
    setErrors({})
  }

  const handleDelete = (id) => {
    persistAddresses(addresses.filter((a) => a.id !== id))
    success('Address removed', 'Address has been deleted.')
  }

  const resetForm = () => {
    setForm(emptyAddress)
    setEditingId(null)
    setShowForm(false)
    setErrors({})
  }

  const handleAddNew = () => {
    resetForm()
    setShowForm(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
            My Addresses
          </h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Manage your saved shipping addresses.
          </p>
        </div>
        {!showForm && (
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4" />
            Add New Address
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              {editingId ? 'Edit Address' : 'New Address'}
            </h2>
            <button
              onClick={resetForm}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Full Name"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                error={errors.fullName}
              />
              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={errors.phone}
              />
            </div>
            <Input
              label="Address"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              error={errors.address}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                label="City"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                error={errors.city}
              />
              <Input
                label="State"
                value={form.state}
                onChange={(e) => handleChange('state', e.target.value)}
                error={errors.state}
              />
              <Input
                label="Pincode"
                value={form.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                error={errors.pincode}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave}>
                {editingId ? 'Update Address' : 'Save Address'}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-200 bg-white px-6 py-16 text-center shadow-soft dark:border-surface-800 dark:bg-surface-900">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-brand-100 blur-2xl opacity-60 dark:bg-brand-950" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 ring-1 ring-brand-100 dark:from-surface-800 dark:to-surface-900 dark:ring-surface-700">
              <MapPin className="h-9 w-9 text-brand-500 dark:text-brand-400" strokeWidth={1.5} />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
            No addresses saved yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-surface-500 dark:text-surface-400">
            Add a shipping address to use during checkout.
          </p>
          <Button onClick={handleAddNew} className="mt-6">
            <Plus className="h-4 w-4" />
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="rounded-2xl border border-surface-200 bg-white p-5 shadow-soft transition-all dark:border-surface-800 dark:bg-surface-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-surface-900 dark:text-surface-100">
                    {address.fullName}
                  </p>
                  <p className="mt-1 text-sm text-surface-600 dark:text-surface-300">
                    {address.address}
                  </p>
                  <p className="text-sm text-surface-600 dark:text-surface-300">
                    {address.city}, {address.state} {address.pincode}
                  </p>
                  <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                    {address.phone}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(address)}
                    aria-label={`Edit address for ${address.fullName}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 transition-colors hover:bg-surface-100 hover:text-brand-600 dark:text-surface-500 dark:hover:bg-surface-800 dark:hover:text-brand-400"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    aria-label={`Delete address for ${address.fullName}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-surface-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Addresses
