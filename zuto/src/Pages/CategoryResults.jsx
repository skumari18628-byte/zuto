import { useParams, useNavigate } from 'react-router-dom'
import RestaurantCard from '../components/RestaurantCard.jsx'
import { categories, restaurants } from '../data/mockData.js'

export default function CategoryResults() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const category = categories.find((c) => c.id === categoryId)
  const results = restaurants.filter((r) => r.category === categoryId)

  return (
    <div className="page">
      <div className="topbar">
        <button className="topbar-back" onClick={() => navigate(-1)}>←</button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 15 }}>
          {category ? `${category.emoji} ${category.label}` : 'Category'}
        </div>
        <div style={{ width: 38 }} />
      </div>
      <div className="page-body" style={{ paddingTop: 6 }}>
        {results.length === 0 ? (
          <div className="empty-state">
            <p>No hidden gems in this category yet — check back soon.</p>
          </div>
        ) : (
          <div className="restaurant-list">
            {results.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}