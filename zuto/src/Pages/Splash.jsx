import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

export default function Splash() {
  const navigate = useNavigate()
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1800)
    const navTimer = setTimeout(() => {
      navigate('/login')
    }, 2200)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(navTimer)
    }
  }, [navigate])

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