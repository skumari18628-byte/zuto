import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { categories, studentOffers, restaurants } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

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
          {(user?.name || 'G').charAt(0).toUpperCase()}
        </button>
      </div>

      <div className="page-body" style={{ paddingTop: 4 }}>
        <h1 style={{ fontSize: 26, marginTop: 6 }}>
          Find your next
          <br />
          hidden gem.
        </h1>

        <div className="search-bar">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search restaurants, food, cafes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="section-title" style={{ marginTop: 24 }}>
          <h2>Categories</h2>
        </div>
        <div className="category-row">
          <button
            className={`category-chip ${!activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            <span className="emoji">✦</span>
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="emoji">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="section-title">
          <h2>Student offers</h2>
          <span className="see-all">See all</span>
        </div>
        <div className="offer-scroll">
          {studentOffers.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <div>
                <div className="offer-title">{offer.title}</div>
                <div className="offer-sub">{offer.subtitle}</div>
              </div>
              <span className="pill-tag" style={{ background: 'rgba(250,250,248,0.15)', color: 'var(--paper)', alignSelf: 'flex-start' }}>
                Student
              </span>
            </div>
          ))}
        </div>

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