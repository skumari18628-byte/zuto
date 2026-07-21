import { useNavigate, useLocation } from 'react-router-dom'

const items = [
  { path: '/dashboard', icon: '⌂', label: 'Home' },
  { path: '/rewards', icon: '✦', label: 'Rewards' },
  { path: '/profile', icon: '◍', label: 'Profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.path}
          className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}