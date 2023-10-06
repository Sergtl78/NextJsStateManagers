import React, { Suspense } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { appData } from '@/lib/dataApp'
import ThemeToggle from './ThemeToggle'
import Cart from './Cart'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className="sticky top-0 left-0 z-50 flex w-full h-14 md:h-20 shadow px-4 py-2 bg-background border-b border-border">
      <div className="container flex w-full items-center justify-between ">
        <Link href={'/'}>
          <Button variant={'ghost'} size={'sm'}>
            <h1 className="text-2xl font-bold">{appData.title}</h1>
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <Cart />
          <Suspense
            fallback={
              <div className="h-8 w-8 animate-pulse rounded-md bg-background" />
            }
          >
            <ThemeToggle />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
