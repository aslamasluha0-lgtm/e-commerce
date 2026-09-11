import { Outlet } from 'react-router-dom'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
