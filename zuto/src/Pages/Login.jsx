import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useApp } from '../context/useApp.js'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useApp()
  const [role, setRole] = useState(location.state?.role || 'customer')
  const [identifier, setIdentifier] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = identifier.split('@')[0] || 'Guest'
    login({ name: name || 'Guest', contact: identifier || 'guest@zuto.app' }, role)
    navigate(role === 'vendor' ? '/vendor' : '/dashboard')
  }

  return (
    <div className="page">
      <div className="page-body" style={{ paddingTop: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
          <Logo />
        </div>
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Welcome back</h1>
        <p style={{ textAlign: 'center', marginTop: 8 }}>
          Sign in to keep exploring hidden gems.
        </p>

        <div style={{ display: 'flex', gap: 8, marginTop: 26, marginBottom: 8 }}>
          <button
            type="button"
            className={`btn btn-sm ${role === 'customer' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1 }}
            onClick={() => setRole('customer')}
          >
            Customer
          </button>
          <button
            type="button"
            className={`btn btn-sm ${role === 'vendor' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1 }}
            onClick={() => setRole('vendor')}
          >
            Vendor
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <div className="field">
            <label>Email or phone number</label>
            <input
              type="text"
              placeholder="you@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>

        <div className="divider-row">or continue with</div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary">🔍 Google</button>
          <button className="btn btn-secondary"> Apple</button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 26, fontSize: 13.5 }}>
          New to ZUTO?{' '}
          <Link to="/register" style={{ fontWeight: 700, color: 'var(--ink)' }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}