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

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { appData } from '@/lib/dataApp'

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

        {/*  <ScrollArea className="h-[70vh]"> */}
        <div className="flex flex-col space-y-2">{children}</div>
        {/* </ScrollArea> */}
        <SheetFooter>
          <div className="flex w-full items-center justify-center">
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
