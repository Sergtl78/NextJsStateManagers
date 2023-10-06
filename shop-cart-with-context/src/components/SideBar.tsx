import { getCategories } from '@/lib/fetchData'
import React from 'react'
import ScrollArea from './ScrollArea'
import Link from 'next/link'

type Props = {}

const SideBar = async (props: Props) => {
  const categories = await getCategories()
  return (
    <aside className="hidden md:flex flex-col w-1/5 h-full py-4">
      <h2 className="h3 mb-2">Categories</h2>
      <ScrollArea>
        <Link href={`/`}>
          <div className="flex w-full items-center rounded-sm px-4 py-2  outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground">
            All
          </div>
        </Link>
        {categories.map((category, ind) => (
          <Link href={`/${category}`} key={category + ind}>
            <div className="flex w-full text-sm items-center rounded-sm px-4 py-2  outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground">
              <p className="capitalize">{category}</p>
            </div>
          </Link>
        ))}
      </ScrollArea>
    </aside>
  )
}

export default SideBar
