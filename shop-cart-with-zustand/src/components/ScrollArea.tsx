import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

const ScrollArea = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'w-full h-[80vh] overflow-hidden hover:overflow-y-auto border-b border-t',
        className
      )}
    >
      {children}
    </div>
  )
}

export default ScrollArea
