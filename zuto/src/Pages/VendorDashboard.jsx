import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { restaurants } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

const tabs = ['Overview', 'Menu', 'Orders', 'Offers']

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

export default function VendorDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useApp()
  const [tab, setTab] = useState('Overview')
  const restaurant = restaurants[0]
  const maxRevenue = Math.max(...revenueByDay.map((d) => d.amount))

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

        <div className="tab-row" style={{ marginTop: 22 }}>
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
            <div className="card" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>Create promotional offer</h3>
              <p style={{ fontSize: 13, marginBottom: 14 }}>Boost sales with a limited-time offer for your customers.</p>
              <button className="btn btn-primary">+ Create new offer</button>
            </div>
            <div className="coupon-card">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>Happy Hour Special</div>
                <div style={{ fontSize: 12.5, color: 'var(--stone)' }}>20% off, 3–5 PM daily</div>
              </div>
              <span className="pill-tag" style={{ color: 'var(--good)' }}>● Live</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}