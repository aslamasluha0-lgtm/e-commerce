import { useQuery } from '@tanstack/react-query'
import { Users } from 'lucide-react'
import { userService } from '@/services/userService'
import AdminTable from '@/components/admin/AdminTable'
import StatusBadge from '@/components/admin/StatusBadge'
import EmptyState from '@/components/common/EmptyState'
import ErrorMessage from '@/components/common/ErrorMessage'
import Skeleton from '@/components/common/Skeleton'
import { formatDate } from '@/utils/formatDate'

const AdminUsers = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['admin-users'],
    queryFn: userService.getAll,
  })

  const columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Name',
      render: (user) => user.name || user.fullName || user.username || '—',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'role',
      label: 'Role',
      render: (user) => (
        <span className="capitalize">{user.role || 'user'}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (user) => (
        <StatusBadge status={user.blocked ? 'inactive' : 'active'} />
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (user) => (user.createdAt ? formatDate(user.createdAt) : '—'),
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          Users
        </h1>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <ErrorMessage
          message="Unable to load users."
          onRetry={refetch}
        />
      )}

      {!isLoading && !isError && users.length === 0 && (
        <EmptyState
          title="No users found"
          description="There are no users registered yet."
          icon={Users}
        />
      )}

      {!isLoading && !isError && users.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800">
          <AdminTable columns={columns} data={users} />
        </div>
      )}
    </div>
  )
}

export default AdminUsers
