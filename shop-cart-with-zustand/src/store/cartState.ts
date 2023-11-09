import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { Product } from '@/types/product'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

export interface CartItem
  extends Omit<Product, 'description' | 'brand' | 'stock' | 'category'> {
  quantity: number
}

type State = {
  cartItems: CartItem[]
}

type Actions = {
  addCart: (value: CartItem) => void
  addFromCart: (id: number, count: number) => void
  removeFromCart: (id: number, count: number) => void
  removeItemCart: (id: number) => void
  getCartItemsTotal: () => number
  getCartTotal: () => number
  clearCart: () => void
}

export const useCartStore = createWithEqualityFn<State & Actions>()(
  persist(
    immer(
      devtools(
        (set, get) => ({
          cartItems: [],
          addCart: (value: CartItem) => {
            const { cartItems } = get()

            const isCart = cartItems.find(
              (cartItem) => cartItem.id === value.id
            )
            if (isCart) {
              set(
                (state) => ({
                  cartItems: state.cartItems.map((item) =>
                    item.id === value.id
                      ? { ...item, quantity: item.quantity + value.quantity }
                      : item
                  ),
                }),
                false,
                'cart/addCart'
              )
            } else {
              set({ cartItems: cartItems.concat(value) }, false, 'cart/addCart')
            }
          },
          addFromCart: (id: number, count: number) => {
            const { cartItems } = get()
            const isCart = cartItems.find((cartItem) => cartItem.id === id)
            if (isCart) {
              set(
                {
                  cartItems: cartItems.map((item) =>
                    item.id === id
                      ? { ...item, quantity: item.quantity + count }
                      : item
                  ),
                },
                false,
                'cart/addFromCart'
              )
            }
          },
          removeFromCart: (id: number, count: number) => {
            const { cartItems } = get()
            const isCart = cartItems.find((cartItem) => cartItem.id === id)
            if (isCart) {
              isCart.quantity > count
                ? set(
                    {
                      cartItems: cartItems.map((item) =>
                        item.id === id
                          ? { ...item, quantity: item.quantity - count }
                          : item
                      ),
                    },
                    false,
                    'cart/removeFromCart'
                  )
                : set(
                    { cartItems: cartItems.filter((item) => item.id !== id) },
                    false,
                    'cart/removeFromCart'
                  )
            }
          },
          removeItemCart: (id: number) => {
            set(
              (state) => ({
                cartItems: state.cartItems.filter((item) => item.id !== id),
              }),
              false,
              'cart/removeItemCart'
            )
          },
          getCartItemsTotal: () => {
            const { cartItems } = get()
            return cartItems.reduce((total, item) => total + item.quantity, 0)
          },
          getCartTotal: () => {
            const { cartItems } = get()
            return cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )
          },
          clearCart: () =>
            set((state) => ({ cartItems: [] }), false, 'cart/clearCart'),
        }),
        { name: 'cart' }
      )
    ),
    { name: 'cart' }
  ),
  shallow
)
