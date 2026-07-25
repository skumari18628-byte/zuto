import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useApp } from '../context/useApp.js'

export default function Splash() {
  const navigate = useNavigate()
  const { user, role } = useApp()
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1800)
    const navTimer = setTimeout(() => {
      if (user) {
        navigate(role === 'vendor' ? '/vendor' : '/dashboard')
      } else {
        navigate('/login')
      }
    }, 2200)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(navTimer)
    }
  }, [navigate, user, role])

  return (
    <div className="page">
      <div className="center-col">
        <div className={`splash-content ${exiting ? 'exit' : ''}`}>
          <div className="splash-loader-wrap">
            <div className="splash-loader-ring" />
            <Logo />
          </div>
        </div>
      </div>
    </div>
  )
}