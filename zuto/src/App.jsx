import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from './Pages/Splash.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import CategoryResults from './Pages/CategoryResults.jsx'
import RestaurantDetails from './Pages/RestaurantDetails.jsx'
import Rewards from './Pages/Rewards.jsx'
import Profile from './Pages/Profile.jsx'
import VendorDashboard from './Pages/VendorDashboard.jsx'

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