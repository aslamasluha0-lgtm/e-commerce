import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Home from '@/pages/public/Home'
import Products from '@/pages/public/Products'
import ProductDetails from '@/pages/public/ProductDetails'
import Categories from '@/pages/public/Categories'
import NotFound from '@/pages/public/NotFound'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ProtectedRoutes from './ProtectedRoutes'
import AdminRoutes from './AdminRoutes'
import Profile from '@/pages/customer/Profile'
import Wishlist from '@/pages/customer/Wishlist'
import Cart from '@/pages/customer/Cart'
import Checkout from '@/pages/customer/Checkout'
import Orders from '@/pages/customer/Orders'
import OrderDetails from '@/pages/customer/OrderDetails'
import Addresses from '@/pages/customer/Addresses'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import ProductsManagement from '@/pages/admin/ProductsManagement'
import AddProduct from '@/pages/admin/AddProduct'
import EditProduct from '@/pages/admin/EditProduct'
import OrdersManagement from '@/pages/admin/OrdersManagement'
import UsersManagement from '@/pages/admin/UsersManagement'
import CategoriesManagement from '@/pages/admin/CategoriesManagement'
import ReviewsManagement from '@/pages/admin/ReviewsManagement'
import CouponsManagement from '@/pages/admin/CouponsManagement'
import Analytics from '@/pages/admin/Analytics'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/addresses" element={<Addresses />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductsManagement />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/:id/edit" element={<EditProduct />} />
          <Route path="/admin/orders" element={<OrdersManagement />} />
          <Route path="/admin/users" element={<UsersManagement />} />
          <Route path="/admin/categories" element={<CategoriesManagement />} />
          <Route path="/admin/reviews" element={<ReviewsManagement />} />
          <Route path="/admin/coupons" element={<CouponsManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
