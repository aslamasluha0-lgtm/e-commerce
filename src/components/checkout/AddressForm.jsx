import Input from '@/components/common/Input'

const AddressForm = ({ value = {}, onChange, errors = {} }) => {
  const setField = (name, val) => onChange?.(name, val)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Full Name"
          value={value.fullName || ''}
          onChange={(e) => setField('fullName', e.target.value)}
          error={errors.fullName}
        />
        <Input
          label="Phone"
          value={value.phone || ''}
          onChange={(e) => setField('phone', e.target.value)}
          error={errors.phone}
        />
      </div>
      <Input
        label="Address"
        value={value.address || ''}
        onChange={(e) => setField('address', e.target.value)}
        error={errors.address}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label="City"
          value={value.city || ''}
          onChange={(e) => setField('city', e.target.value)}
          error={errors.city}
        />
        <Input
          label="State"
          value={value.state || ''}
          onChange={(e) => setField('state', e.target.value)}
          error={errors.state}
        />
        <Input
          label="Pincode"
          value={value.pincode || ''}
          onChange={(e) => setField('pincode', e.target.value)}
          error={errors.pincode}
        />
      </div>
    </div>
  )
}

export default AddressForm
