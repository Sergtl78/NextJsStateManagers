'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { Provider } from 'react-redux'
import { createStore } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const Providers = ({ children }: { children: ReactNode }) => {
  const store = createStore()
  let persistor = persistStore(store)
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}
export default Providers
