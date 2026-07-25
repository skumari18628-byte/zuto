import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

export default function VendorSwitchLoading() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/vendor'), 950)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="page">
      <div className="center-col">
        <div className="splash-loader-wrap">
          <div className="splash-loader-ring once" />
          <Logo />
        </div>
      </div>
    </div>
  )
}