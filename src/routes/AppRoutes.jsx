import { Routes, Route, Navigate } from 'react-router-dom'
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
import Account from '@/pages/customer/Account'
import Profile from '@/pages/customer/Profile'
import Wishlist from '@/pages/customer/Wishlist'
import Cart from '@/pages/customer/Cart'
import Checkout from '@/pages/customer/Checkout'
import Orders from '@/pages/customer/Orders'
import OrderDetails from '@/pages/customer/OrderDetails'
import OrderSuccess from '@/pages/customer/OrderSuccess'
import Addresses from '@/pages/customer/Addresses'

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
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/addresses" element={<Addresses />} />

          <Route path="/account" element={<Account />}>
            <Route index element={<Navigate to="/account/profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
