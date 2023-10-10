import { CartItem } from '@/types/cart'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type CartState = {
  cart: CartItem[]
}

const initialState: CartState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartItem>) => {
      const isItemInState = state.cart.find(
        (item) => item.id === action.payload.id
      )
      if (isItemInState) {
        state.cart.map((cartItem) =>
          cartItem.id === action.payload.id
            ? (cartItem.quantity = cartItem.quantity + action.payload.quantity)
            : cartItem
        )
      } else {
        state.cart.push(action.payload)
      }
    },
    incrementFromCart: (
      state,
      action: PayloadAction<{ id: number; increment: number }>
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = item.quantity + action.payload.increment
      }
    },
    decrementFromCart: (
      state,
      action: PayloadAction<{ id: number; decrement: number }>
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id)
      if (item && item?.quantity <= action.payload.decrement) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id)
      } else {
        if (item) {
          item.quantity = item.quantity - action.payload.decrement
        }
      }
    },
    deleteCartItem: (state, action: PayloadAction<{ id: number }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)
    },
    deleteCart: (state) => {
      state.cart = []
    },
  },
})

export const { actions: cartActions, reducer: cartReducer } = cartSlice
