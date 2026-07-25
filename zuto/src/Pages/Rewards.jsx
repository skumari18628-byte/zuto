import { useState } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import { coupons } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

const earnTasks = [
  { id: 'e1', icon: '📸', title: 'Upload food photo', desc: 'Post a quality photo on your visit', reward: '+50 gems', done: false },
  { id: 'e2', icon: '🛍️', title: 'First order', desc: 'Complete your first ZUTO order', reward: '+100 gems', done: true },
  { id: 'e3', icon: '⭐', title: 'Leave a review', desc: 'Rate a vendor after your visit', reward: '+30 gems', done: false },
]

const redeemables = [
  { id: 'r1', emoji: '🍰', name: 'Slice of Cake', cat: 'Dessert', cost: 300 },
  { id: 'r2', emoji: '🥐', name: 'Croissant', cat: 'Bakery', cost: 100 },
  { id: 'r3', emoji: '☕', name: 'Filter Coffee', cat: 'Cafe', cost: 80 },
  { id: 'r4', emoji: '🥤', name: 'Cold Drink', cat: 'Drinks', cost: 60 },
]

export default function Rewards() {
  const { rewardPoints } = useApp()
  const [tab, setTab] = useState('offers')
  const nextTier = 1000
  const progress = Math.min(100, (rewardPoints / nextTier) * 100)

  return (
    <div className="page">
      <div className="page-body" style={{ paddingTop: 50 }}>
        <div className="rewards-hero">
          <div className="rewards-hero-top">
            <div>
              <div className="rewards-hero-title">Rewards</div>
              <div className="rewards-hero-sub">Earn &amp; redeem exclusive perks</div>
            </div>
            <div className="tier-pill">🥈<br />Silver</div>
          </div>
          <div className="rewards-balance-row">
            <div>
              <div className="rewards-balance-lbl">Your balance</div>
              <div className="rewards-balance-num">{rewardPoints} <span style={{ fontSize: 16 }}>gems</span></div>
            </div>
          </div>
          <div className="tier-progress-track">
            <div className="tier-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="tier-progress-note">{Math.max(0, nextTier - rewardPoints)} gems to Gold tier</div>
        </div>

        <div className="segmented-tabs">
          <button className={tab === 'offers' ? 'active' : ''} onClick={() => setTab('offers')}>🎁 Offers</button>
          <button className={tab === 'earn' ? 'active' : ''} onClick={() => setTab('earn')}>📷 Earn</button>
          <button className={tab === 'redeem' ? 'active' : ''} onClick={() => setTab('redeem')}>🎟 Redeem</button>
        </div>

        {tab === 'offers' && (
          <>
            {coupons.map((c) => (
              <div className="coupon-card" key={c.id} style={{ marginTop: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>{c.title}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--stone)', marginTop: 2 }}>{c.detail}</div>
                </div>
                <span className="code">{c.code}</span>
              </div>
            ))}
          </>
        )}

        {tab === 'earn' && (
          <>
            {earnTasks.map((t) => (
              <div className="earn-item" key={t.id}>
                <div className="earn-icon">{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div className="earn-title">{t.title}</div>
                  <div className="earn-desc">{t.desc}</div>
                </div>
                <span className={`earn-badge ${t.done ? 'done' : ''}`}>
                  {t.done ? '✓ Done' : t.reward}
                </span>
              </div>
            ))}
          </>
        )}

        {tab === 'redeem' && (
          <div className="redeem-grid">
            {redeemables.map((r) => (
              <div className="redeem-card" key={r.id}>
                <div className="redeem-emoji">{r.emoji}</div>
                <div className="redeem-name">{r.name}</div>
                <div className="redeem-cat">{r.cat}</div>
                <div className="redeem-cost">★ {r.cost} gems</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}