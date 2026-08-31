import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import AIChatbot from '@/components/ai-chat/AIChatbot'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}

export default MainLayout
