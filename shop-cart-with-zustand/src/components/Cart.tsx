'use client'

import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import CartNavIcon from './CartNavIcon'
import Link from 'next/link'
import Image from 'next/image'

import CounterCart from './CounterCart'
import { TrashIcon } from '@radix-ui/react-icons'
import ScrollArea from './ScrollArea'

import { useCartStore } from '@/store/cartState'

type Props = {}

const Cart = (props: Props) => {
  const cartItems = useCartStore((state) => state.cartItems)
  const clearCart = useCartStore((state) => state.clearCart)
  const removeItemCart = useCartStore((state) => state.removeItemCart)
  const totalPrice = useCartStore((state) => state.getCartTotal)
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
              onClick={() => clearCart()}
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
                <h3 className="h3">The cart is still empty</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visit the main page to select products
                </p>
                <SheetClose asChild>
                  <Link href={'/'}>
                    <Button>Go to Main</Button>
                  </Link>
                </SheetClose>
              </div>
            )}
            {cartItems.length > 0 &&
              cartItems.map((cartItem, ind) => (
                <div
                  key={ind}
                  className="flex flex-col  w-full items-center justify-between border border-border rounded-xl shadow-md space-x-5"
                >
                  <div className="flex flex-row w-full items-center justify-between p-2 md:p-0 ">
                    <Link href={`/product/${cartItem.id}`} className="">
                      <div className="overflow-hidden flex shrink-0  w-20 h-20">
                        <Image
                          className="h-auto w-auto object-cover transition-all hover:scale-105 rounded-lg aspect-[4/4]"
                          src={cartItem.thumbnail}
                          alt={cartItem.title}
                          width={100}
                          height={100}
                        />
                      </div>
                    </Link>
                    <h3 className="font-semibold ml-4 truncate">
                      {cartItem.title}{' '}
                    </h3>

                    <Button
                      className="group"
                      onClick={() => removeItemCart(cartItem.id)}
                      variant={'ghost'}
                      size={'icon'}
                    >
                      <TrashIcon className="w-6 h-6 stroke-1 group-hover:stroke-destructive" />
                    </Button>
                  </div>

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
            <span>{totalPrice().toLocaleString('ru-RU')} $</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
