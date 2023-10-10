'use client'

import React from 'react'
import { Button } from './ui/button'
import CartIcon from './CartIcon'
import { Product } from '@/types/product'
import { useCartActions } from '@/store/context/store'

type Props = {
  product: Product
}

export default function ButtonAddCart({ product }: Props) {
  const { brand, description, stock, category, ...itemCart } = product
  const actions = useCartActions()
  return (
    <div>
      <Button onClick={() => actions.addCart({ ...itemCart, quantity: 1 })}>
        <CartIcon className="w-6 h-6 fill-primary-foreground" />
      </Button>
    </div>
  )
}
