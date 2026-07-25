import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useApp } from '../context/useApp.js'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name: name || 'Guest', contact: email || 'guest@zuto.app' }, 'customer')
    navigate('/dashboard')
  }

  const handleSocialSignup = (provider) => {
    login({ name: name || `${provider} User`, contact: email || `${provider.toLowerCase()}@zuto.app` }, 'customer')
    navigate('/dashboard')
  }

  return (
    <div className="page">
      <div className="page-body" style={{ paddingTop: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
          <Logo />
        </div>
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Create your account</h1>
        <p style={{ textAlign: 'center', marginTop: 8 }}>
          Join ZUTO and start earning rewards from your first order.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 26 }}>
          <div className="field">
            <label>Full name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Phone number</label>
            <input type="tel" placeholder="+91" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary">
            Create account
          </button>
        </form>

        <div className="divider-row">or continue with</div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => handleSocialSignup('Google')}>
            🔍 Google
          </button>
          <button className="btn btn-secondary" onClick={() => handleSocialSignup('Apple')}>
            Apple
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 26, fontSize: 13.5 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 700, color: 'var(--ink)' }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}