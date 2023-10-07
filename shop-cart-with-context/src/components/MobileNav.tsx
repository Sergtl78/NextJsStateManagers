'use client'

import React, { ReactNode } from 'react'
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
import { TrashIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import ScrollArea from './ScrollArea'
import { appData } from '@/lib/dataApp'
import SideBar from './SideBar'

type Props = {
  children: ReactNode
}

const MobileNav = ({ children }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className=" flex w-8 h-8 items-center justify-center">
          <Button variant={'ghost'} size={'icon'}>
            <HamburgerMenuIcon className="w-6 h-6 fill-foreground" />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle>{appData.title}</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[70vh]">
          <div className="flex flex-col space-y-2">{children}</div>
        </ScrollArea>
        <SheetFooter>
          <div className="flex h-32 w-full items-center justify-center">
            <SheetClose>
              <Button>Close</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
