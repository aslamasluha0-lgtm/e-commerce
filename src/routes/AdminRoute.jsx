import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from '@/hooks/useAdminAuth'

const AdminRoute = () => {
  const { adminUser } = useAdminAuth()
  const location = useLocation()

  const isAdmin = Boolean(adminUser && adminUser.role === 'admin')

  if (!isAdmin) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    )
  }

  return <Outlet />
}

export default AdminRoute