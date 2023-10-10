'use client'

import React from 'react'
import { Button } from './ui/button'
import CartIcon from './CartIcon'
import { IProduct } from '@/types/product'
import { useActionCreators } from '@/redux/store'
import { cartActions } from '@/redux/features/cart-slice'

type Props = {
  product: IProduct
}

export default function ButtonAddCart({ product }: Props) {
  const { brand, description, stock, category, ...item } = product
  // const dispatch = useAppDispatch()
  const actions = useActionCreators(cartActions)
  return (
    <div>
      <Button onClick={() => actions.addCart({ ...item, quantity: 1 })}>
        <CartIcon className="w-6 h-6 fill-primary-foreground" />
      </Button>
    </div>
  )
}
