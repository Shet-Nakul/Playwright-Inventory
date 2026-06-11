import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import ToastContainer from './components/ToastContainer'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import AddProductPage from './pages/AddProductPage'
import SuppliersPage from './pages/SuppliersPage'
import OrdersPage from './pages/OrdersPage'
import InteractionsPage from './pages/InteractionsPage'
import DynamicContentPage from './pages/DynamicContentPage'
import FramesPage from './pages/FramesPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<AddProductPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/interactions" element={<InteractionsPage />} />
          <Route path="/dynamic" element={<DynamicContentPage />} />
          <Route path="/frames" element={<FramesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}
