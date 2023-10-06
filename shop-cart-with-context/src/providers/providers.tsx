'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import ContextProvider from './contextProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ContextProvider>{children}</ContextProvider>
    </ThemeProvider>
  )
}
export default Providers
