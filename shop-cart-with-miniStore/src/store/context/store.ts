import { useEffect } from 'react'
import createOptimalContext, { Store } from './createOptimalContext'

let initialCart: Store = { cartItems: [], totalPrice: 0 }

export const { Provider: CartProvider, useStore } = createOptimalContext(
  typeof window !== 'undefined' && localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || `${initialCart}`)
    : initialCart
)

export const useCartActions = () => {
  const { actions } = useStore()
  return actions
}
export const useCartItems = () => {
  const { query } = useStore()

  return query((store) => store.cartItems)
}
export const useCartTotalPrice = () => {
  const { query } = useStore()
  return query((store) => store.totalPrice)
}
