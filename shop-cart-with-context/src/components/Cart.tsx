'use client'

import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import CartNavIcon from './CartNavIcon'
import Link from 'next/link'
import Image from 'next/image'
import {
  useCartDispatch,
  useCartState,
} from '@/store/context/createCartContext'
import CounterCart from './CounterCart'
import { TrashIcon } from '@radix-ui/react-icons'
import ScrollArea from './ScrollArea'

type Props = {}

const Cart = (props: Props) => {
  const cartItems = useCartState()
  const dispatch = useCartDispatch()
  const totalPrice = cartItems.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  )
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <CartNavIcon />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex flex-row gap-4 items-center">
            <SheetTitle>Cart</SheetTitle>
            <Button
              className="group"
              onClick={() =>
                dispatch({
                  type: 'deleteCart',
                })
              }
              variant={'ghost'}
              size={'icon'}
            >
              <TrashIcon className="w-6 h-6 stroke-1 group-hover:stroke-destructive" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[70vh]">
          <div className="flex flex-col space-y-2">
            {cartItems && cartItems.length === 0 && (
              <div className=" flex flex-col w-full items-center justify-center">
                <h3 className="h3">В корзине пока пусто</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Загляните на главную, чтобы выбрать товары
                </p>
                <Link href={'/'}>
                  <Button>Перейти на главную</Button>
                </Link>
              </div>
            )}
            {cartItems &&
              cartItems.map((cartItem, ind) => (
                <div
                  key={ind}
                  className="flex flex-col  w-full items-center justify-between border border-border rounded-xl shadow-md space-x-5"
                >
                  <Link href={''} className="w-full">
                    <div className="flex flex-row w-full items-center justify-start p-2 md:p-0 ">
                      <div className="overflow-hidden flex shrink-0  w-20 h-20">
                        <Image
                          className="h-auto w-auto object-cover transition-all hover:scale-105 rounded-lg aspect-[4/4]"
                          src={cartItem.thumbnail}
                          alt={cartItem.title}
                          width={100}
                          height={100}
                        />
                      </div>
                      <h3 className="font-semibold ml-4">{cartItem.title} </h3>
                    </div>
                  </Link>

                  <div className="flex w-full p-2  ">
                    <CounterCart cartItem={cartItem} />
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
        <div className="flex flex-col w-full py-4">
          <div className="flex flex-row w-full text-lg font-semibold items-center justify-between">
            <p>Total:</p>
            <span>{totalPrice.toLocaleString('ru-RU')} $</span>
          </div>
        </div>
        <SheetFooter className="fle">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
