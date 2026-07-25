import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { categories, restaurants } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

const dailySpecials = [
  { id: 'd1', name: 'Paneer Tikka Bowl', vendor: 'Street Flame', emoji: '🍛', oldPrice: 180, newPrice: 120, off: '33% off' },
  { id: 'd2', name: 'Cold Brew Combo', vendor: 'Brew Corner', emoji: '☕', oldPrice: 220, newPrice: 149, off: '32% off' },
  { id: 'd3', name: 'Fruit Chaat Bowl', vendor: "South Tiffin House", emoji: '🍉', oldPrice: 80, newPrice: 60, off: '25% off' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useApp()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesQuery =
        !query ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !activeCategory || r.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [query, activeCategory])

  const featured = restaurants.slice(0, 2)
  const firstName = (user?.name || 'Guest').split(' ')[0]

  return (
    <div className="page">
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size="sm" />
          <div>
            <div style={{ fontSize: 11, color: 'var(--stone)', fontWeight: 600 }}>
              DELIVERING NEAR
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>Within 2 km · Indiranagar</div>
          </div>
        </div>
        <button
          className="avatar-lg"
          style={{ width: 38, height: 38, fontSize: 15 }}
          onClick={() => navigate('/profile')}
        >
          {firstName.charAt(0).toUpperCase()}
        </button>
      </div>

      <div className="page-body" style={{ paddingTop: 4 }}>
        <div className="greeting-row">
          <div>
            <div className="greeting-hello">Hey {firstName} 👋</div>
            <div className="greeting-sub">What are you craving today?</div>
          </div>
        </div>

        <div className="search-row">
          <div className="search-bar">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search cafés, street food, bakeries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="filter-btn" aria-label="Filter">⚙</button>
        </div>

        <div className="section-title" style={{ marginTop: 24 }}>
          <h2>Categories</h2>
        </div>
        <div className="cat-icon-row">
          <div
            className={`cat-icon-item ${!activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            <div className="cat-icon-circle">✦</div>
            <div className="cat-icon-label">All</div>
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`cat-icon-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className="cat-icon-circle">{cat.emoji}</div>
              <div className="cat-icon-label">{cat.label}</div>
            </div>
          ))}
        </div>

        <div className="section-title">
          <h2>Daily specials</h2>
          <span className="see-all">Ends in 4h</span>
        </div>
        {dailySpecials.map((s) => (
          <div className="specials-card" key={s.id}>
            <div className="specials-left">
              <div className="specials-emoji">{s.emoji}</div>
              <div>
                <div className="specials-name">{s.name}</div>
                <div className="specials-vendor">{s.vendor}</div>
              </div>
            </div>
            <div className="specials-price">
              <span className="specials-old">₹{s.oldPrice}</span>{' '}
              <span className="specials-new">₹{s.newPrice}</span>
              <div><span className="specials-off">{s.off}</span></div>
            </div>
          </div>
        ))}

        <div className="section-title">
          <h2>Featured vendors</h2>
        </div>
        {featured.map((r) => (
          <div
            className="featured-row"
            key={r.id}
            onClick={() => navigate(`/restaurant/${r.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={r.banner} alt={r.name} />
            <div>
              <div className="featured-badge">★ Top Rated</div>
              <div className="featured-name">{r.name}</div>
              <div className="featured-meta">{r.rating} · {r.distance}</div>
            </div>
          </div>
        ))}

        <div className="section-title">
          <h2>Nearby hidden gems</h2>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No hidden gems matched that search. Try another category.</p>
          </div>
        ) : (
          <div className="restaurant-list">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}