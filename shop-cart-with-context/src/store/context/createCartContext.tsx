'use client'
import { ICartItem } from '@/types/cart'
import { createContext, useContext, useEffect, useReducer } from 'react'

type Action =
  | { type: 'setCart'; payload: ICartItem[] }
  | { type: 'addCart'; payload: ICartItem }
  | { type: 'removeFromCart'; payload: { id: number } }
  | { type: 'deleteCartItem'; payload: { id: number } }
  | { type: 'deleteCart' }
type Dispatch = (action: Action) => void
type State = ICartItem[]
type CartProviderProps = { children: React.ReactNode }

const CartStateContext = createContext<State | undefined>(undefined)
const CartDispatchContext = createContext<Dispatch | undefined>(undefined)

function CartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setCart': {
      return action.payload
    }
    case 'addCart': {
      const isItemInState = state.find((item) => item.id === action.payload.id)
      if (isItemInState) {
        const newState: State = state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              }
            : item
        )

        return newState
      }
      const newState: State = [...state, action.payload]
      return newState
    }
    case 'removeFromCart': {
      const isItemInState = state.find((item) => item.id === action.payload.id)
      if (isItemInState?.quantity === 1) {
        return state.filter((item) => item.id !== action.payload.id)
      } else {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
    }
    case 'deleteCartItem': {
      return state.filter((item) => item.id !== action.payload.id)
    }
    case 'deleteCart': {
      return []
    }

    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}
let initialCart: State
function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(CartReducer, initialCart, () =>
    typeof window !== 'undefined' && localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems') || '[]')
      : []
  )

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      initialCart = JSON.parse(cartItems)
      dispatch({
        type: 'setCart',
        payload: initialCart,
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state))
  }, [state])

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

function useCartState() {
  const context = useContext(CartStateContext)
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider')
  }
  return context
}

function useCartDispatch() {
  const context = useContext(CartDispatchContext)
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCartState, useCartDispatch }
