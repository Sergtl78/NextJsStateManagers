import React from 'react'
import { Skeleton } from './ui/skeleton'

type Props = {
  title: string
  count: number
  mounted: boolean
}

const Header = ({ title, count, mounted }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <h2 className="h2">{title}</h2>
      {mounted ? (
        <span className="text-sm">Render: {count}</span>
      ) : (
        <Skeleton className="w-20 h-6" />
      )}
    </div>
  )
}

export default Header
