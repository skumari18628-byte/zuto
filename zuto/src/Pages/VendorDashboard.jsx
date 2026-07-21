import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { restaurants } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

const tabs = ['Overview', 'Orders', 'Menu', 'Coupons']

const mockOrders = [
  { id: 1, item: 'Cold Coffee x2, Tiramisu', status: 'Pending', total: 520 },
  { id: 2, item: 'Veg Burger, Fries', status: 'Completed', total: 280 },
  { id: 3, item: 'Masala Dosa x3', status: 'Completed', total: 270 },
  { id: 4, item: 'Podi Idli, Filter Coffee', status: 'Cancelled', total: 120 },
]

export default function VendorDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useApp()
  const [tab, setTab] = useState('Overview')
  const restaurant = restaurants[0]

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
            <span className="pill-tag">Vendor mode</span>
            <h1 style={{ fontSize: 24, marginTop: 8 }}>{restaurant.name}</h1>
            <p style={{ marginTop: 4, fontSize: 13.5 }}>{user.name} · {restaurant.cuisine}</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Log out
          </button>
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
            <div className="stat-grid">
              <div className="stat-card">
                <div className="value">₹4,280</div>
                <div className="label">Today's sales</div>
              </div>
              <div className="stat-card">
                <div className="value">₹26,900</div>
                <div className="label">Weekly sales</div>
              </div>
              <div className="stat-card">
                <div className="value">₹1.1L</div>
                <div className="label">Monthly revenue</div>
              </div>
              <div className="stat-card">
                <div className="value">312</div>
                <div className="label">Customers</div>
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

        {tab === 'Orders' && (
          <>
            <div className="section-title">
              <h2 style={{ fontSize: 19 }}>Today's orders</h2>
            </div>
            {mockOrders.map((o) => (
              <div className="card" key={o.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{o.item}</span>
                  <span style={{ fontSize: 14 }}>₹{o.total}</span>
                </div>
                <span
                  className="pill-tag"
                  style={{
                    marginTop: 8,
                    color:
                      o.status === 'Completed'
                        ? 'var(--good)'
                        : o.status === 'Cancelled'
                        ? 'var(--bad)'
                        : 'var(--ink-soft)',
                  }}
                >
                  {o.status}
                </span>
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

        {tab === 'Coupons' && (
          <>
            <div className="section-title">
              <h2 style={{ fontSize: 19 }}>Active coupons</h2>
              <span className="see-all">+ Create</span>
            </div>
            <div className="coupon-card">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>Student Discount</div>
                <div style={{ fontSize: 12.5, color: 'var(--stone)' }}>10% off with college ID</div>
              </div>
              <span className="code">STUDENT10</span>
            </div>
            <div className="coupon-card">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>Festival Offer</div>
                <div style={{ fontSize: 12.5, color: 'var(--stone)' }}>Buy 2 get 1 free</div>
              </div>
              <span className="code">FEST2B1</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}