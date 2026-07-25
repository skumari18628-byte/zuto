import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { restaurants } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

const tabs = ['Overview', 'Menu', 'Orders', 'Offers', 'Promote']

const revenueByDay = [
  { day: 'M', amount: 1800 },
  { day: 'T', amount: 2100 },
  { day: 'W', amount: 1600 },
  { day: 'T', amount: 2840 },
  { day: 'F', amount: 2000 },
  { day: 'S', amount: 2600 },
  { day: 'S', amount: 2200 },
]

const preOrders = [
  { id: 1, customer: 'Mohit D.', time: '11:00 AM', items: 'Masala Chai x3, Samosa x2', total: 140, status: 'new' },
  { id: 2, customer: 'Sneha R.', time: '1:30 PM', items: 'Cold Coffee x1, Croissant x2', total: 240, status: 'confirmed' },
]

const promoTiers = [
  {
    id: 'day',
    tier: 'bronze',
    name: 'Daily',
    price: 50,
    period: '/ day',
    benefits: [
      'Bronze shine ring on your listing',
      'Featured in "Promoted near you"',
      'Runs for 24 hours',
    ],
  },
  {
    id: 'month',
    tier: 'silver',
    name: 'Monthly',
    price: 700,
    period: '/ month',
    benefits: [
      'Silver shine ring on your listing',
      'Featured in "Promoted near you"',
      'Priority placement in search results',
      'Runs for 30 days',
    ],
  },
  {
    id: 'year',
    tier: 'gold',
    name: 'Yearly',
    price: 8400,
    period: '/ year',
    benefits: [
      'Gold shine ring on your listing',
      'Featured in "Promoted near you"',
      'Top priority placement in search results',
      'Dedicated homepage banner slot',
      'Runs for 365 days',
    ],
  },
]

const promoPayMethods = [
  { id: 'card', icon: '💳', label: 'Card' },
  { id: 'upi', icon: '📲', label: 'UPI' },
]

export default function VendorDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useApp()
  const [tab, setTab] = useState('Overview')
  const restaurant = restaurants[0]
  const maxRevenue = Math.max(...revenueByDay.map((d) => d.amount))

  const [offers, setOffers] = useState([
    { id: 1, title: 'Happy Hour Special', detail: '20% off, 3–5 PM daily' },
  ])
  const [offerFormOpen, setOfferFormOpen] = useState(false)
  const [offerName, setOfferName] = useState('')
  const [offerPercent, setOfferPercent] = useState('')

  const [selectedTier, setSelectedTier] = useState(null)
  const [promoPayMethod, setPromoPayMethod] = useState('card')
  const [activePromo, setActivePromo] = useState(null)

  const handleCreateOffer = (e) => {
    e.preventDefault()
    setOffers((prev) => [
      { id: Date.now(), title: offerName, detail: `${offerPercent}% off` },
      ...prev,
    ])
    setOfferName('')
    setOfferPercent('')
    setOfferFormOpen(false)
  }

  const handleConfirmPromo = () => {
    setActivePromo(selectedTier)
    setSelectedTier(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Log in as a vendor to see your dashboard.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Log in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-body" style={{ paddingTop: 50, paddingBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="pill-tag" style={{ color: 'var(--good)' }}>● Open</span>
            <h1 style={{ fontSize: 24, marginTop: 8 }}>{restaurant.name}</h1>
            <p style={{ marginTop: 4, fontSize: 13.5 }}>{user.name} · Indiranagar</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Log out
          </button>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="value">34</div>
            <div className="label">Today's orders</div>
          </div>
          <div className="stat-card">
            <div className="value">₹2,840</div>
            <div className="label">Revenue</div>
          </div>
        </div>

        <div className="tab-row" style={{ marginTop: 22, flexWrap: 'wrap' }}>
          {tabs.map((t) => (
            <button
              key={t}
              className={`tab-btn ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Overview' && (
          <>
            <div className="section-title">
              <h2 style={{ fontSize: 19 }}>Revenue this week</h2>
            </div>
            <div className="card">
              <div className="revenue-chart">
                {revenueByDay.map((d, i) => (
                  <div className="revenue-bar-col" key={i}>
                    <div
                      className={`revenue-bar ${d.amount === maxRevenue ? 'peak' : ''}`}
                      style={{ height: `${(d.amount / maxRevenue) * 100}%` }}
                    />
                    <div className="revenue-bar-day">{d.day}</div>
                  </div>
                ))}
              </div>
              <div className="revenue-total-row">
                <div>
                  <div style={{ fontSize: 11.5, color: 'var(--stone)' }}>Total this week</div>
                  <div className="revenue-total-num">₹15,570</div>
                </div>
                <span className="revenue-delta">↑ 18% vs last week</span>
              </div>
            </div>

            <div className="section-title">
              <h2 style={{ fontSize: 19 }}>Top selling items</h2>
            </div>
            {restaurant.menu.map((item, i) => (
              <div className="profile-row" key={item.id}>
                <span>#{i + 1} {item.name}</span>
                <span style={{ color: 'var(--stone)', fontSize: 12.5 }}>₹{item.price}</span>
              </div>
            ))}
          </>
        )}

        {tab === 'Menu' && (
          <>
            <div className="section-title">
              <h2 style={{ fontSize: 19 }}>Menu management</h2>
              <span className="see-all">+ Add item</span>
            </div>
            {restaurant.menu.map((item) => (
              <div className="menu-item" key={item.id}>
                <span className="name">{item.name}</span>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className="price">₹{item.price}</span>
                  <span style={{ fontSize: 12, color: 'var(--stone)' }}>Edit</span>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'Orders' && (
          <>
            <div className="section-title">
              <h2 style={{ fontSize: 19 }}>Pre-orders</h2>
            </div>
            {preOrders.map((o) => (
              <div className="order-card" key={o.id}>
                <div className="order-card-top">
                  <div>
                    <div className="order-customer">{o.customer}</div>
                    <div className="order-time">{o.time}</div>
                  </div>
                  <span
                    className="pill-tag"
                    style={{ color: o.status === 'new' ? 'var(--ink-soft)' : 'var(--good)' }}
                  >
                    {o.status === 'new' ? 'New' : '✓ Confirmed'}
                  </span>
                </div>
                <div className="order-items">{o.items}</div>
                <div className="order-bottom-row">
                  <div className="order-price">₹{o.total}</div>
                  {o.status === 'new' && (
                    <div className="order-actions">
                      <button className="accept-btn">Accept</button>
                      <button className="decline-btn">Decline</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'Offers' && (
          <>
            <div className="section-title">
              <h2 style={{ fontSize: 19 }}>Active offers</h2>
            </div>

            {!offerFormOpen ? (
              <div className="card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, marginBottom: 6 }}>Create promotional offer</h3>
                <p style={{ fontSize: 13, marginBottom: 14 }}>
                  Boost sales with a limited-time offer for your customers.
                </p>
                <button className="btn btn-primary" onClick={() => setOfferFormOpen(true)}>
                  + Create new offer
                </button>
              </div>
            ) : (
              <form className="card" style={{ marginBottom: 16 }} onSubmit={handleCreateOffer}>
                <h3 style={{ fontSize: 16, marginBottom: 14 }}>New offer</h3>
                <div className="field">
                  <label>Offer name</label>
                  <input
                    type="text"
                    placeholder="e.g. Weekend Special"
                    value={offerName}
                    onChange={(e) => setOfferName(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label>Discount percentage</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="e.g. 20"
                    value={offerPercent}
                    onChange={(e) => setOfferPercent(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setOfferFormOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {offers.map((o) => (
              <div className="coupon-card" key={o.id}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>{o.title}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--stone)' }}>{o.detail}</div>
                </div>
                <span className="pill-tag" style={{ color: 'var(--good)' }}>● Live</span>
              </div>
            ))}
          </>
        )}

        {tab === 'Promote' && (
          <>
            <div className="promo-header">
              <div className="promo-p-logo">P</div>
              <div>
                <h2 style={{ fontSize: 19 }}>Promote your restaurant</h2>
                <p style={{ fontSize: 12.5, marginTop: 2 }}>Get seen first by hungry customers nearby.</p>
              </div>
            </div>

            {activePromo && !selectedTier && (
              <div className="card" style={{ marginTop: 16, background: 'var(--paper-dim)' }}>
                <p style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 600 }}>
                  ✓ Your {promoTiers.find((t) => t.id === activePromo)?.name.toLowerCase()} promotion is live.
                </p>
              </div>
            )}

            {!selectedTier ? (
              promoTiers.map((t) => (
                <div
                  className={`promo-tier-card tier-${t.tier}`}
                  key={t.id}
                  style={{ '--tier-color': `var(--tier-color)` }}
                >
                  <div className="promo-tier-top">
                    <div>
                      <div className="promo-tier-name">{t.name}</div>
                    </div>
                    <div className="promo-tier-price">
                      <div className="amount">₹{t.price}</div>
                      <div className="period">{t.period}</div>
                    </div>
                  </div>
                  <div className="promo-benefits">
                    {t.benefits.map((b, i) => (
                      <div className="promo-benefit-row" key={i}>
                        <span className="check">✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: 16 }}
                    onClick={() => setSelectedTier(t.id)}
                  >
                    Choose {t.name.toLowerCase()} plan
                  </button>
                </div>
              ))
            ) : (
              <div className="card" style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>Choose payment method</h3>
                <p style={{ fontSize: 12.5 }}>
                  Paying ₹{promoTiers.find((t) => t.id === selectedTier)?.price} for the{' '}
                  {promoTiers.find((t) => t.id === selectedTier)?.name.toLowerCase()} plan.
                </p>
                <div className="pay-method-row">
                  {promoPayMethods.map((m) => (
                    <div
                      key={m.id}
                      className={`pay-method-option ${promoPayMethod === m.id ? 'selected' : ''}`}
                      onClick={() => setPromoPayMethod(m.id)}
                    >
                      <span className="icon">{m.icon}</span>
                      <span className="label">{m.label}</span>
                      <span className="radio-dot" />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <button className="btn btn-primary" onClick={handleConfirmPromo}>
                    Confirm payment
                  </button>
                  <button className="btn btn-secondary" onClick={() => setSelectedTier(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}