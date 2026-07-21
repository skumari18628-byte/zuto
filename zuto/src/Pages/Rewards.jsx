import BottomNav from '../components/BottomNav.jsx'
import { coupons } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

export default function Rewards() {
  const { rewardPoints } = useApp()

  return (
    <div className="page">
      <div className="page-body" style={{ paddingTop: 50 }}>
        <h1 style={{ fontSize: 26 }}>Rewards</h1>
        <p style={{ marginTop: 6 }}>Earn points every time you order or leave a review.</p>

        <div
          className="card"
          style={{
            marginTop: 22,
            background: 'var(--ink)',
            color: 'var(--paper)',
            border: 'none',
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Your balance
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 42, marginTop: 6 }}>
            {rewardPoints} pts
          </div>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>
            200 pts unlocks a free dessert at any partner spot
          </div>
        </div>

        <div className="section-title">
          <h2 style={{ fontSize: 19 }}>How to earn</h2>
        </div>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="value">+10%</div>
            <div className="label">First order discount</div>
          </div>
          <div className="stat-card">
            <div className="value">🍮</div>
            <div className="label">Free dessert after review</div>
          </div>
        </div>

        <div className="section-title">
          <h2 style={{ fontSize: 19 }}>Your coupons</h2>
        </div>
        {coupons.map((c) => (
          <div className="coupon-card" key={c.id}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{c.title}</div>
              <div style={{ fontSize: 12.5, color: 'var(--stone)', marginTop: 2 }}>{c.detail}</div>
            </div>
            <span className="code">{c.code}</span>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  )
}