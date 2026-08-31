import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema } from '@/utils/validators'
import Input from '@/components/common/Input'

const AddressForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <Input
          label="Phone"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>
      <Input
        label="Address"
        {...register('address')}
        error={errors.address?.message}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          label="State"
          {...register('state')}
          error={errors.state?.message}
        />
        <Input
          label="Pincode"
          {...register('pincode')}
          error={errors.pincode?.message}
        />
      </div>
    </form>
  )
}

export default AddressForm
