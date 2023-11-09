import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  className?: string
  count?: number
}

const BadgeIcon = ({ className, count }: Props) => {
  return (
    <div
      className={cn(
        'absolute -top-3 -right-3 flex items-center justify-center w-5 h-5 rounded-full bg-primary border-primary border-2 ',
        className
      )}
    >
      <span className="text-xs font-bold text-primary-foreground">{count}</span>
    </div>
  )
}

export default BadgeIcon
