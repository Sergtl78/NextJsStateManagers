'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
export default Providers
