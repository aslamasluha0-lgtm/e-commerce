import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Ban, LockOpen, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { userService } from '@/services/userService'
import AdminTable from '@/components/admin/AdminTable'
import AdminPagination from '@/components/admin/AdminPagination'
import AdminLoading from '@/components/admin/AdminLoading'
import AdminError from '@/components/admin/AdminError'
import AdminEmptyState from '@/components/admin/AdminEmptyState'
import StatusBadge from '@/components/admin/StatusBadge'
import Input from '@/components/common/Input'
import { formatDate } from '@/utils/formatDate'

const PAGE_SIZE = 10

const AdminUsers = () => {
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const hasActiveFilters = Boolean(debouncedSearch || statusFilter || roleFilter)

  const filterKey = `${debouncedSearch}::${statusFilter}::${roleFilter}`
  const [lastFilterKey, setLastFilterKey] = useState('')

  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey)
    if (page !== 1) setPage(1)
  }

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      'admin-users',
      page,
      PAGE_SIZE,
      debouncedSearch,
      statusFilter,
      roleFilter,
    ],
    queryFn: () =>
      userService.getAll({
        _page: page,
        _limit: PAGE_SIZE,
        ...(debouncedSearch ? { q: debouncedSearch } : {}),
        ...(statusFilter === 'blocked' ? { blocked: true } : {}),
        ...(statusFilter === 'active' ? { blocked: false } : {}),
        ...(roleFilter ? { role: roleFilter } : {}),
      }),
  })

  const { data: roleData } = useQuery({
    queryKey: ['admin-users'],
    queryFn: userService.getAll,
  })

  const users = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const roles = [...new Set((roleData?.items ?? []).map((u) => u.role).filter(Boolean))].sort()

  const updateUserMutation = useMutation({
    mutationFn: ({ user, blocked }) =>
      userService.update(user.id, { blocked }),

    onSuccess: async (_updatedUser, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['admin-users'],
      })

      toast.success(
        variables.blocked
          ? 'User blocked successfully'
          : 'User unblocked successfully'
      )
    },

    onError: () => {
      toast.error('Failed to update user status')
    },
  })

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: (user) => (
        <span className="font-medium text-surface-900 dark:text-surface-100">
          {user.name || user.fullName || user.username || user.email || '—'}
        </span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (user) => (
        <span className="truncate max-w-[220px] block text-surface-700 dark:text-surface-300">
          {user.email}
        </span>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (user) => (
        <span className="capitalize text-surface-700 dark:text-surface-300">
          {user.role || 'customer'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (user) => (
        <StatusBadge status={user.blocked ? 'blocked' : 'active'} />
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (user) => (user.createdAt ? formatDate(user.createdAt) : '—'),
    },
    {
      key: 'actions',
      label: 'Action',
      render: (user) => {
        const isBlocked = Boolean(user.blocked)
        const isPending =
          updateUserMutation.isPending &&
          String(updateUserMutation.variables?.user?.id) === String(user.id)

        return (
          <button
            type="button"
            onClick={() =>
              updateUserMutation.mutate({ user, blocked: !isBlocked })
            }
            disabled={updateUserMutation.isPending}
            aria-busy={isPending || undefined}
            aria-label={isBlocked ? `Unblock ${user.name || user.email}` : `Block ${user.name || user.email}`}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              isBlocked
                ? 'border-emerald-200 bg-white text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-900 dark:bg-surface-900 dark:text-emerald-300 dark:hover:bg-emerald-950/40'
                : 'border-red-200 bg-white text-red-700 hover:border-red-300 hover:bg-red-50 dark:border-red-900 dark:bg-surface-900 dark:text-red-300 dark:hover:bg-red-950/40'
            }`}
          >
            {isBlocked ? (
              <LockOpen className="h-3.5 w-3.5" />
            ) : (
              <Ban className="h-3.5 w-3.5" />
            )}
            {isPending
              ? isBlocked
                ? 'Unblocking...'
                : 'Blocking...'
              : isBlocked
                ? 'Unblock'
                : 'Block'}
          </button>
        )
      },
    },
  ]

  const clearFilters = () => {
    setSearch('')
    setDebouncedSearch('')
    setStatusFilter('')
    setRoleFilter('')
    setPage(1)
  }

  const selectClass =
    'h-11 rounded-xl border border-surface-200 bg-white px-3.5 text-sm text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/60 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100'

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white">Users</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Manage registered DevTech users.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <div className="sm:flex-1 sm:max-w-sm">
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              aria-label="Search users"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={selectClass}
            aria-label="Filter by status"
          >
            <option value="">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={selectClass}
            aria-label="Filter by role"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <AdminLoading message="Loading Users..." />}

      {isError && (
        <AdminError message="Unable to load users." onRetry={refetch} />
      )}

      {!isLoading && !isError && users.length === 0 && (
        hasActiveFilters ? (
          <AdminEmptyState
            title="No users match your filters."
            description="Try adjusting your search or filters."
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        ) : (
          <AdminEmptyState
            title="No users found"
            description="There are no users registered yet."
            icon={Users}
          />
        )
      )}

      {!isLoading && !isError && users.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800">
          <AdminTable columns={columns} data={users} />
        </div>
      )}

      {!isLoading && !isError && users.length > 0 && totalPages > 1 && (
        <AdminPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}

export default AdminUsers