import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from '@/redux/store'
import { AdminAuthProvider } from '@/context/AdminAuthContext'
import AppRoutes from '@/routes/AppRoutes'
import ScrollToTop from './components/common/ScrollToTop'
import WishlistSync from './components/wishlist/WishlistSync'
import Footer from './components/common/Footer'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AdminAuthProvider>
          <BrowserRouter>
           <ScrollToTop/>
            <WishlistSync />
            <AppRoutes />
          </BrowserRouter>
        </AdminAuthProvider>
      </QueryClientProvider>
      <Footer/>
    </Provider>
  )
}

export default App
