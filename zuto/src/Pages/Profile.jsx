import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import { restaurants } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

export default function Profile() {
  const navigate = useNavigate()
  const { user, favourites, orderHistory, rewardPoints, logout } = useApp()

  const favRestaurants = restaurants.filter((r) => favourites.includes(r.id))

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>You're not logged in.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Log in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-body" style={{ paddingTop: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="avatar-lg">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <h1 style={{ fontSize: 21 }}>{user.name}</h1>
            <p style={{ marginTop: 3, fontSize: 13.5 }}>{user.contact}</p>
          </div>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="value">{rewardPoints}</div>
            <div className="label">Reward points</div>
          </div>
          <div className="stat-card">
            <div className="value">{favRestaurants.length}</div>
            <div className="label">Favourites</div>
          </div>
        </div>

        <div className="section-title">
          <h2 style={{ fontSize: 19 }}>Favourite restaurants</h2>
        </div>
        {favRestaurants.length === 0 ? (
          <p style={{ fontSize: 13.5 }}>Tap the heart on a restaurant to save it here.</p>
        ) : (
          favRestaurants.map((r) => (
            <div
              className="profile-row"
              key={r.id}
              onClick={() => navigate(`/restaurant/${r.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <span>{r.name}</span>
              <span className="chevron">→</span>
            </div>
          ))
        )}

        <div className="section-title">
          <h2 style={{ fontSize: 19 }}>Order history</h2>
        </div>
        {orderHistory.length === 0 ? (
          <p style={{ fontSize: 13.5 }}>No orders yet — pre-order from a restaurant page to see it here.</p>
        ) : (
          orderHistory.map((o) => (
            <div className="profile-row" key={o.id}>
              <span>{o.restaurant}</span>
              <span style={{ color: 'var(--stone)', fontSize: 12.5 }}>
                {o.items.join(', ')}
              </span>
            </div>
          ))
        )}

        <div className="section-title">
          <h2 style={{ fontSize: 19 }}>Settings</h2>
        </div>
        <div className="profile-row" style={{ cursor: 'pointer' }}>
          <span>Notification preferences</span>
          <span className="chevron">→</span>
        </div>
        <div className="profile-row" style={{ cursor: 'pointer' }}>
          <span>Payment methods</span>
          <span className="chevron">→</span>
        </div>
        <div className="profile-row" style={{ cursor: 'pointer' }} onClick={() => navigate('/vendor')}>
          <span>Switch to vendor mode</span>
          <span className="chevron">→</span>
        </div>

        <button
          className="btn btn-ghost"
          style={{ marginTop: 24 }}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      <BottomNav />
    </div>
  )
}