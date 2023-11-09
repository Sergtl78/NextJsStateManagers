'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import BadgeIcon from './ui/badge-icon'
import CartIcon from './CartIcon'
import { useCartStore } from '@/store/cartState'

const CartNavIcon = () => {
  const cartItems = useCartStore((state) => state.cartItems)
  const cartItemTotal = useCartStore((state) => state.getCartItemsTotal)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted ? (
        <div className="relative flex w-8 h-8 items-center justify-center">
          <Button variant={'ghost'} size={'icon'}>
            <CartIcon className="w-6 h-6 fill-foreground" />
          </Button>
          <BadgeIcon count={cartItemTotal()} />
        </div>
      ) : (
        <div className="h-full w-full animate-pulse" />
      )}
    </>
  )
}

export default CartNavIcon
