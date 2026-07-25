import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/useApp.js'

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate()
  const { favourites, toggleFavourite } = useApp()
  const isFav = favourites.includes(restaurant.id)
  const promo = restaurant.promotion

  return (
    <div className="restaurant-card">
      <div
        className={`thumb ${promo ? `promo-ring tier-${promo.tier}` : ''}`}
        style={{ backgroundImage: `url(${restaurant.banner})` }}
      >
        <span className={`status-pill ${restaurant.isOpen ? 'open' : 'closed'}`}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </span>
        <button
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation()
            toggleFavourite(restaurant.id)
          }}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFav ? '♥' : '♡'}
        </button>
        {promo && <span className="promo-chip">{promo.label}</span>}
      </div>
      <div className="info">
        <div className="info-top">
          <div>
            <h3>{restaurant.name}</h3>
            <p className="cuisine">{restaurant.cuisine}</p>
          </div>
          <span className="rating">★ {restaurant.rating}</span>
        </div>
        <div className="meta-row">
          <span>{restaurant.distance}</span>
          <span>·</span>
          <span>₹{restaurant.avgCost} for two</span>
        </div>
        <button
          className="btn btn-secondary btn-sm view-btn"
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        >
          View restaurant
        </button>
      </div>
    </div>
  )
}