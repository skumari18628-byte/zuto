import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

export default function Splash() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="center-col">
        <Logo animated />
        <div style={{ height: 22 }} />
        <div className="zuto-wordmark">ZUTO</div>
        <p style={{ marginTop: 10, maxWidth: 260 }}>
          Hidden gems near you — the small places worth walking for.
        </p>
        <div style={{ height: 40 }} />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Get Started
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate('/login', { state: { role: 'vendor' } })}
          >
            I'm a vendor
          </button>
        </div>
      </div>
    </div>
  )
}