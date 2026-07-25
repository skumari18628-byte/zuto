import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { restaurants } from '../data/mockData.js'
import { useApp } from '../context/useApp.js'

const payMethods = [
  { id: 'card', icon: '💳', label: 'Card' },
  { id: 'upi', icon: '📲', label: 'UPI' },
  { id: 'cod', icon: '💵', label: 'Cash on Delivery' },
]

export default function RestaurantDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = restaurants.find((r) => r.id === id)
  const { favourites, toggleFavourite, addReservation, addOrder } = useApp()
  const [tab, setTab] = useState('menu')
  const [reserveOpen, setReserveOpen] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(2)
  const [confirmed, setConfirmed] = useState(null)

  const [payOpen, setPayOpen] = useState(false)
  const [payMethod, setPayMethod] = useState('card')

  if (!restaurant) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Restaurant not found.</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </button>
        </div>
      </div>
    )
  }

  const isFav = favourites.includes(restaurant.id)

  const handleReserve = (e) => {
    e.preventDefault()
    addReservation({
      restaurant: restaurant.name,
      date,
      time,
      guests,
      id: Date.now(),
    })
    setConfirmed('reservation')
    setReserveOpen(false)
  }

  const handleConfirmPreOrder = () => {
    addOrder({
      restaurant: restaurant.name,
      items: restaurant.menu.slice(0, 2).map((m) => m.name),
      payMethod,
      id: Date.now(),
    })
    setConfirmed('order')
    setPayOpen(false)
  }

  return (
    <div className="page">
      <div className="banner" style={{ backgroundImage: `url(${restaurant.banner})` }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
      </div>

      <div className="detail-overlay-card">
        <div className="info-top">
          <div>
            <h1 style={{ fontSize: 26 }}>{restaurant.name}</h1>
            <p style={{ marginTop: 4 }}>{restaurant.cuisine}</p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toggleFavourite(restaurant.id)}
          >
            {isFav ? '♥ Saved' : '♡ Save'}
          </button>
        </div>

        <div className="meta-row" style={{ marginTop: 12 }}>
          <span className="rating">★ {restaurant.rating}</span>
          <span>{restaurant.distance}</span>
          <span>·</span>
          <span>₹{restaurant.avgCost} for two</span>
          <span
            className="pill-tag"
            style={{ color: restaurant.isOpen ? 'var(--good)' : 'var(--bad)' }}
          >
            {restaurant.isOpen ? 'Open now' : 'Closed'}
          </span>
        </div>

        <div>
          <span className="tag-pill">Student Friendly</span>
          <span className="tag-pill">Seating Available</span>
          <span className="tag-pill">₹{Math.round(restaurant.avgCost / 2)}–{restaurant.avgCost}</span>
        </div>

        <div className="page-body" style={{ padding: '0 0 100px' }}>
          <p style={{ marginTop: 16 }}>{restaurant.description}</p>

          <div className="gallery-row">
            {restaurant.gallery.map((src, i) => (
              <img key={i} src={src} alt={`${restaurant.name} gallery ${i + 1}`} />
            ))}
          </div>

          <div className="tab-row">
            <button
              className={`tab-btn ${tab === 'menu' ? 'active' : ''}`}
              onClick={() => setTab('menu')}
            >
              Menu
            </button>
            <button
              className={`tab-btn ${tab === 'info' ? 'active' : ''}`}
              onClick={() => setTab('info')}
            >
              Details
            </button>
          </div>

          {tab === 'menu' ? (
            <div style={{ marginTop: 8 }}>
              {restaurant.menu.map((item) => (
                <div className="menu-item" key={item.id}>
                  <span className="name">{item.name}</span>
                  <span className="price">₹{item.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="info-list">
              <div className="row">
                <span className="label">Hours</span>
                <span>{restaurant.hours}</span>
              </div>
              <div className="row">
                <span className="label">Contact</span>
                <span>{restaurant.contact}</span>
              </div>
              <div className="row">
                <span className="label">Distance</span>
                <span>{restaurant.distance}</span>
              </div>
            </div>
          )}

          {reserveOpen && (
            <form className="card" style={{ marginTop: 20 }} onSubmit={handleReserve}>
              <h3 style={{ fontSize: 17, marginBottom: 14 }}>Reserve a seat</h3>
              <div className="field">
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="field">
                <label>Time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="field">
                <label>Number of people</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Confirm reservation
              </button>
            </form>
          )}

          {payOpen && (
            <div className="card" style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Choose payment method</h3>
              <p style={{ fontSize: 12.5 }}>How would you like to pay for your pre-order?</p>
              <div className="pay-method-row">
                {payMethods.map((m) => (
                  <div
                    key={m.id}
                    className={`pay-method-option ${payMethod === m.id ? 'selected' : ''}`}
                    onClick={() => setPayMethod(m.id)}
                  >
                    <span className="icon">{m.icon}</span>
                    <span className="label">{m.label}</span>
                    <span className="radio-dot" />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn btn-primary" onClick={handleConfirmPreOrder}>
                  Confirm pre-order
                </button>
                <button className="btn btn-secondary" onClick={() => setPayOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {confirmed && (
            <div className="card" style={{ marginTop: 20, textAlign: 'center' }}>
              <p style={{ color: 'var(--ink)', fontWeight: 600 }}>
                {confirmed === 'reservation'
                  ? `You're booked for ${guests} at ${restaurant.name} on ${date} at ${time}.`
                  : `Your pre-order at ${restaurant.name} is placed — walk in and skip the line.`}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="sticky-cta">
        <button className="btn btn-secondary" onClick={() => setReserveOpen((v) => !v)}>
          Reserve seat
        </button>
        <button className="btn btn-primary" onClick={() => setPayOpen(true)}>
          Pre-order
        </button>
      </div>
    </div>
  )
}