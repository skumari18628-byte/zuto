import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CategoryResults from './pages/CategoryResults.jsx'
import RestaurantDetails from './pages/RestaurantDetails.jsx'
import Rewards from './pages/Rewards.jsx'
import Profile from './pages/Profile.jsx'
import VendorDashboard from './pages/VendorDashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category/:categoryId" element={<CategoryResults />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/vendor" element={<VendorDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}