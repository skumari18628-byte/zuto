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
        <div className="profile-hero">
          <div className="profile-hero-top">
            <div className="avatar-lg">{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className="profile-hero-name">{user.name}</div>
              <div className="profile-hero-contact">{user.contact}</div>
            </div>
          </div>
          <div className="profile-mini-stats">
            <div className="stat">
              <div className="num">{favRestaurants.length}</div>
              <div className="lbl">Favourites</div>
            </div>
            <div className="stat">
              <div className="num">{orderHistory.length}</div>
              <div className="lbl">Orders</div>
            </div>
            <div className="stat">
              <div className="num">{rewardPoints}</div>
              <div className="lbl">Points</div>
            </div>
          </div>
        </div>

        <div className="section-title">
          <h2 style={{ fontSize: 19 }}>Favourite restaurants</h2>
          {favRestaurants.length > 0 && <span className="see-all">See all</span>}
        </div>
        {favRestaurants.length === 0 ? (
          <p style={{ fontSize: 13.5 }}>Tap the heart on a restaurant to save it here.</p>
        ) : (
          <div className="fav-scroll">
            {favRestaurants.map((r) => (
              <div
                className="fav-card"
                key={r.id}
                onClick={() => navigate(`/restaurant/${r.id}`)}
              >
                <img src={r.banner} alt={r.name} />
                <div className="fav-info">
                  <div className="fav-name">{r.name}</div>
                  <div className="fav-rating">★ {r.rating}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="section-title">
          <h2 style={{ fontSize: 19 }}>Recent orders</h2>
          {orderHistory.length > 0 && <span className="see-all">See all</span>}
        </div>
        {orderHistory.length === 0 ? (
          <p style={{ fontSize: 13.5 }}>No orders yet — pre-order from a restaurant page to see it here.</p>
        ) : (
          orderHistory.slice(0, 4).map((o) => (
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

        <div className="list-item">
          <span className="list-icon">🔔</span>
          <span className="list-label">Notifications</span>
          <span className="list-badge">2 new</span>
        </div>
        <div className="list-item">
          <span className="list-icon">💬</span>
          <span className="list-label">Help &amp; Support</span>
          <span className="chevron">→</span>
        </div>
        <div className="list-item">
          <span className="list-icon">⭐</span>
          <span className="list-label">Rate the app</span>
          <span className="chevron">→</span>
        </div>
        <div className="list-item" onClick={() => navigate('/vendor-loading')}>
          <span className="list-icon">🏪</span>
          <span className="list-label">Switch to vendor dashboard</span>
          <span className="chevron">→</span>
        </div>
        <div className="list-item danger" onClick={handleLogout}>
          <span className="list-icon">↪</span>
          <span className="list-label">Log out</span>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}