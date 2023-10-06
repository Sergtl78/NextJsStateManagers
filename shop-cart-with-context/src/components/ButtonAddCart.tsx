'use client'

import React from 'react'
import { Button } from './ui/button'
import CartIcon from './CartIcon'
import { IProduct } from '@/types/product'
import { useCartDispatch } from '@/store/context/createCartContext'

type Props = {
  product: IProduct
}

export default function ButtonAddCart({ product }: Props) {
  const { brand, description, stock, category, ...item } = product
  const dispatch = useCartDispatch()
  return (
    <div>
      <Button
        onClick={() =>
          dispatch({
            type: 'addCart',
            payload: { ...item, quantity: 1 },
          })
        }
      >
        <CartIcon className="w-6 h-6 fill-primary-foreground" />
      </Button>
    </div>
  )
}
