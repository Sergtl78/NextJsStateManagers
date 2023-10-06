'use client'
import { ICartItem } from '@/types/cart'
import React, { useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { TrashIcon } from '@radix-ui/react-icons'
import { useCartDispatch } from '@/store/context/createCartContext'

type Props = {
  cartItem: ICartItem
}

const CounterCart = ({ cartItem }: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useCartDispatch()
  const handleChange = () => {
    if (Number(ref.current?.value) > 0) {
      dispatch({
        type: 'addCart',
        payload: { ...cartItem, quantity: Number(ref.current?.value) },
      })
    } else {
      dispatch({ type: 'addCart', payload: { ...cartItem, quantity: 0 } })
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center ">
      <div className="flex w-full items-center justify-center">
        <Button
          className="bg-muted"
          onClick={() =>
            dispatch({ type: 'removeFromCart', payload: { id: cartItem.id } })
          }
          variant={'ghost'}
          size={'sm'}
        >
          <b className="text-lg">-</b>
        </Button>
        <Input
          ref={ref}
          onChange={(e) => handleChange()}
          type="number"
          value={cartItem.quantity}
          className="w-full md:w-12 text-lg font-semibold outline-none text-center focus-visible:ring-transparent p-0 "
        />
        <Button
          className="bg-muted"
          onClick={() =>
            dispatch({
              type: 'addCart',
              payload: { ...cartItem, quantity: 1 },
            })
          }
          variant={'ghost'}
          size={'sm'}
        >
          <b className="text-lg">+</b>
        </Button>
      </div>
      <div className="flex flex-row items-center space-x-4 justify-between md:justify-end w-full">
        {cartItem && (
          <p className="text-lg font-semibold">
            {(cartItem.price * cartItem.quantity).toLocaleString('ru-RU') +
              ' $'}
          </p>
        )}
        <Button
          className="group"
          onClick={() =>
            dispatch({
              type: 'deleteCartItem',
              payload: { id: cartItem.id },
            })
          }
          variant={'ghost'}
          size={'icon'}
        >
          <TrashIcon className="w-6 h-6 stroke-1 group-hover:stroke-destructive" />
        </Button>
      </div>
    </div>
  )
}

export default CounterCart
