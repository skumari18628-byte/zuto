import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useApp } from '../context/useApp.js'

const providerDefaults = {
  Google: { name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com' },
  Apple: { name: 'Aarav Sharma', email: 'aarav.sharma@icloud.com' },
}

export default function Register() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [socialStep, setSocialStep] = useState(null)
  const [provider, setProvider] = useState(null)
  const [socialName, setSocialName] = useState('')
  const [socialEmail, setSocialEmail] = useState('')
  const [socialPhone, setSocialPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name: name || 'Guest', contact: email || 'guest@zuto.app' }, 'customer')
    navigate('/dashboard')
  }

  const startSocialSignup = (p) => {
    setProvider(p)
    setSocialName(providerDefaults[p].name)
    setSocialEmail(providerDefaults[p].email)
    setSocialStep('connecting')
    setTimeout(() => setSocialStep('details'), 1000)
  }

  const handleSocialContinue = (e) => {
    e.preventDefault()
    login({ name: socialName, contact: socialEmail }, 'customer')
    navigate('/dashboard')
  }

  if (socialStep === 'connecting') {
    return (
      <div className="page">
        <div className="social-connecting">
          <div className="mini-ring-wrap">
            <div className="mini-ring" />
            <div className="mini-logo">Z</div>
          </div>
          <p>Connecting to {provider}...</p>
        </div>
      </div>
    )
  }

  if (socialStep === 'details') {
    return (
      <div className="page">
        <div className="page-body" style={{ paddingTop: 60 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
            <Logo />
          </div>
          <h1 style={{ fontSize: 26, textAlign: 'center' }}>Confirm your details</h1>
          <p style={{ textAlign: 'center', marginTop: 8 }}>
            Pulled from your {provider} account — feel free to edit it.
          </p>

          <form onSubmit={handleSocialContinue} style={{ marginTop: 24 }}>
            <div className="field">
              <label>Full name</label>
              <input type="text" value={socialName} onChange={(e) => setSocialName(e.target.value)} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={socialEmail} onChange={(e) => setSocialEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Phone number</label>
              <input
                type="tel"
                placeholder="+91"
                value={socialPhone}
                onChange={(e) => setSocialPhone(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Continue to ZUTO
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ marginTop: 10 }}
              onClick={() => setSocialStep(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
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
          <button className="btn btn-secondary" onClick={() => startSocialSignup('Google')}>
            🔍 Google
          </button>
          <button className="btn btn-secondary" onClick={() => startSocialSignup('Apple')}>
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