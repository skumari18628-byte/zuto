import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchWrapRef = useRef(null)

  // Debounce the query so filtering doesn't run on every single keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 200)
    return () => clearTimeout(t)
  }, [query])

  // Close suggestions when clicking outside the search area
  useEffect(() => {
    const handleClick = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      return (
        !debouncedQuery ||
        r.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    })
  }, [debouncedQuery])

  const matchedCategories = useMemo(() => {
    if (!query) return []
    return categories.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  const matchedRestaurants = useMemo(() => {
    if (!query) return []
    return restaurants
      .filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
  }, [query])

  const hasSuggestions = matchedCategories.length > 0 || matchedRestaurants.length > 0

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

        <div className="search-row" ref={searchWrapRef}>
          <div className="search-wrap" style={{ flex: 1 }}>
            <div className="search-bar">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search cafés, street food, bakeries..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => query && setShowSuggestions(true)}
              />
            </div>

            {showSuggestions && query && (
              <div className="search-suggestions">
                {!hasSuggestions ? (
                  <div className="suggestion-empty">No matches for "{query}"</div>
                ) : (
                  <>
                    {matchedCategories.length > 0 && (
                      <>
                        <div className="suggestion-group-label">Categories</div>
                        {matchedCategories.map((c) => (
                          <div
                            className="suggestion-item"
                            key={c.id}
                            onClick={() => {
                              setShowSuggestions(false)
                              navigate(`/category/${c.id}`)
                            }}
                          >
                            <div className="suggestion-icon">{c.emoji}</div>
                            <div className="suggestion-name">{c.label}</div>
                          </div>
                        ))}
                      </>
                    )}
                    {matchedRestaurants.length > 0 && (
                      <>
                        <div className="suggestion-group-label">Restaurants</div>
                        {matchedRestaurants.map((r) => (
                          <div
                            className="suggestion-item"
                            key={r.id}
                            onClick={() => {
                              setShowSuggestions(false)
                              navigate(`/restaurant/${r.id}`)
                            }}
                          >
                            <img src={r.banner} alt={r.name} />
                            <div>
                              <div className="suggestion-name">{r.name}</div>
                              <div className="suggestion-meta">{r.cuisine}</div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          <button className="filter-btn" aria-label="Filter">⚙</button>
        </div>

        <div className="section-title" style={{ marginTop: 24 }}>
          <h2>Categories</h2>
        </div>
        <div className="cat-icon-row">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="cat-icon-item"
              onClick={() => navigate(`/category/${cat.id}`)}
              style={{ cursor: 'pointer' }}
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
            <p>No hidden gems matched that search.</p>
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