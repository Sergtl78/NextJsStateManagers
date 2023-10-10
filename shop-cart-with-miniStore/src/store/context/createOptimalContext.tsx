import { Product } from '@/types/product'
import { Item } from '@radix-ui/react-dropdown-menu'
import { log } from 'console'
import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  useEffect,
} from 'react'

export interface CartItem
  extends Omit<Product, 'description' | 'brand' | 'stock' | 'category'> {
  quantity: number
}

export interface Store {
  cartItems: CartItem[]
  totalPrice: number
}

export default function createOptimalContext(initialState: Store) {
  function useStoreData(): {
    get: () => Store
    set: (value: Partial<Store>) => void
    addCart: (value: CartItem) => void
    addFromCart: (id: number, count: number) => void
    removeFromCart: (id: number, count: number) => void
    removeItemCart: (id: number) => void
    clearCart: () => void
    subscribe: (callback: () => void) => () => void
  } {
    const store = useRef(initialState)

    const get = useCallback(() => store.current, [])

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value }
      subscribers.current.forEach((callback) => callback())
    }, [])

    const subscribers = useRef(new Set<() => void>())

    const calcTotalPrice = (cartItems: CartItem[]) =>
      cartItems.length > 0
        ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0

    const addCart = useCallback((value: CartItem) => {
      const isItemInCart = store.current.cartItems.find(
        (item) => item.id === value.id
      )
      if (isItemInCart) {
        store.current.cartItems = store.current.cartItems.map((item) =>
          item.id === value.id
            ? {
                ...item,
                quantity: item.quantity + value.quantity,
              }
            : item
        )
      } else {
        store.current.cartItems = [...store.current.cartItems, { ...value }]
      }

      store.current.totalPrice = calcTotalPrice(store.current.cartItems)
      subscribers.current.forEach((callback) => callback())
      const state = get()
      localStorage.setItem('cart', JSON.stringify(state))
    }, [])

    const addFromCart = useCallback((id: number, count: number) => {
      store.current.cartItems = store.current.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + count } : item
      )
      store.current.totalPrice = calcTotalPrice(store.current.cartItems)
      subscribers.current.forEach((callback) => callback())
      localStorage.setItem('cart', JSON.stringify(store.current))
    }, [])

    const removeFromCart = useCallback((id: number, count: number) => {
      const isItemInCart = store.current.cartItems.find(
        (item) => item.id === id
      )
      if (isItemInCart && isItemInCart.quantity > count) {
        store.current.cartItems = store.current.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - count } : item
        )
      } else {
        store.current.cartItems = store.current.cartItems.filter(
          (item) => item.id !== id
        )
      }

      store.current.totalPrice = calcTotalPrice(store.current.cartItems)
      subscribers.current.forEach((callback) => callback())
      localStorage.setItem('cart', JSON.stringify(store.current))
    }, [])

    const removeItemCart = useCallback((id: number) => {
      store.current.cartItems = store.current.cartItems.filter(
        (item) => item.id !== id
      )
      store.current.totalPrice = calcTotalPrice(store.current.cartItems)
      subscribers.current.forEach((callback) => callback())
      localStorage.setItem('cart', JSON.stringify(store.current))
    }, [])

    const clearCart = useCallback(() => {
      set({ cartItems: [], totalPrice: 0 })

      subscribers.current.forEach((callback) => callback())
      localStorage.setItem('cart', JSON.stringify(store.current))
    }, [])

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, [])

    return {
      get,
      set,
      addCart,
      addFromCart,
      removeFromCart,
      removeItemCart,
      clearCart,
      subscribe,
    }
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>

  const StoreContext = createContext<UseStoreDataReturnType | null>(null)

  function Provider({ children }: { children: React.ReactNode }) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    )
  }

  function useStore() {
    const store = useContext(StoreContext)
    if (!store) {
      throw new Error('Store not found')
    }
    function query<SelectorOutput>(selector: (store: Store) => SelectorOutput) {
      if (!store) {
        throw new Error('Store not found')
      }
      const state = useSyncExternalStore(
        store.subscribe,
        () => selector(store.get()),
        () => selector(initialState)
      )

      return state
    }

    const { subscribe, ...actions } = store
    return { query, actions }
  }

  return {
    Provider,
    useStore,
  }
}
