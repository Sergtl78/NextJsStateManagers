'use client'
import React, { useContext, useState } from 'react'
import { Button } from './ui/button'
import { IProduct } from '@/types/product'
import CartIcon from './CartIcon'
import { useCartDispatch } from '@/store/context/createCartContext'
import { ICartItem } from '../types/cart'

type Props = {
  product: IProduct
}

const Counter = ({ product }: Props) => {
  const { brand, description, stock, category, ...item } = product
  const [count, setCount] = useState(1)
  const dispatch = useCartDispatch()
  return (
    <div className="flex flex-row w-full justify-between items-center mb-4">
      <div className="flex items-center justify-center">
        <Button
          onClick={() => setCount((prev) => prev - 1)}
          disabled={count === 1}
          variant={'ghost'}
          size={'sm'}
        >
          <b className="text-xl">—</b>
        </Button>
        <span className="text-xl w-8 text-center font-semibold">{count}</span>
        {/* <Input type='number' className='w-5'/> */}
        <Button
          onClick={() => setCount((prev) => prev + 1)}
          variant={'ghost'}
          size={'sm'}
        >
          <b className="text-xl">+</b>
        </Button>
      </div>
      <p className="text-2xl font-semibold">
        {(product.price * count).toLocaleString('ru-RU') + ' $'}
      </p>
      <Button
        onClick={() =>
          dispatch({
            type: 'addCart',
            payload: { ...item, quantity: count },
          })
        }
      >
        <CartIcon className="w-6 h-6 fill-primary-foreground" />
      </Button>
    </div>
  )
}

export default Counter
