'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import BadgeIcon from './ui/badge-icon'
import CartIcon from './CartIcon'
import { useCartState } from '@/store/context/createCartContext'
import { Skeleton } from './ui/skeleton'

const CartNavIcon = () => {
  const state = useCartState()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const cartItemTotal = state.reduce((acc, item) => (acc += item.quantity), 0)

  return (
    <>
      {mounted ? (
        <div className="relative flex w-8 h-8 items-center justify-center">
          <Button variant={'ghost'} size={'icon'}>
            <CartIcon className="w-6 h-6 fill-foreground" />
          </Button>
          <BadgeIcon count={cartItemTotal} />
        </div>
      ) : (
        <div className="h-full w-full bg-red-500" />
      )}
    </>
  )
}

export default CartNavIcon
