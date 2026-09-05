import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import ToastProvider from '@/components/common/Toast'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-surface-50 dark:bg-surface-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <ToastProvider />
    </div>
  )
}

export default MainLayout
