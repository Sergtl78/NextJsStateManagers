'use client'

import { CartProvider } from '@/store/context/createCartContext'
import { ReactNode } from 'react'

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return <CartProvider>{children}</CartProvider>
}

export default ContextProvider
