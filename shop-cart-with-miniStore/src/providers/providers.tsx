'use client'

import { ReactNode, useEffect } from 'react'
import { ThemeProvider } from './theme-provider'
import { CartProvider, useCartActions } from '@/store/context/store'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  )
}
export default Providers
