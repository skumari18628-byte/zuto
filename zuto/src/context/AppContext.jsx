/* eslint-disable react-refresh/only-export-components */
export const AppContext = createContext(null);
import { createContext, useEffect, useState } from 'react'



const STORAGE_KEY = 'zuto_state_v1'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Could not load ZUTO state', e)
  }
  return {
    user: null,
    role: 'customer', // 'customer' | 'vendor'
    favourites: [],
    rewardPoints: 120,
    orderHistory: [],
    reservations: [],
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Could not save ZUTO state', e)
    }
  }, [state])

  const login = (user, role = 'customer') => {
    setState((s) => ({ ...s, user, role }))
  }

  const logout = () => {
    setState((s) => ({ ...s, user: null }))
  }

  const toggleFavourite = (restaurantId) => {
    setState((s) => {
      const has = s.favourites.includes(restaurantId)
      return {
        ...s,
        favourites: has
          ? s.favourites.filter((id) => id !== restaurantId)
          : [...s.favourites, restaurantId],
      }
    })
  }

  const addReservation = (reservation) => {
    setState((s) => ({ ...s, reservations: [reservation, ...s.reservations] }))
  }

  const addOrder = (order) => {
    setState((s) => ({
      ...s,
      orderHistory: [order, ...s.orderHistory],
      rewardPoints: s.rewardPoints + 20,
    }))
  }

  const value = {
    ...state,
    login,
    logout,
    toggleFavourite,
    addReservation,
    addOrder,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}