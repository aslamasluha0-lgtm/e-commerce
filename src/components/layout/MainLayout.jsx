import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AIChatbot from '@/components/ai-chat/AIChatbot'
import ToastProvider from '@/components/common/Toast'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-surface-50 dark:bg-surface-950">
      <Navbar />
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <AIChatbot />
      <ToastProvider />
    </div>
  )
}

export default MainLayout
