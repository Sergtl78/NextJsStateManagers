import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const SkeletonCardList = (props: Props) => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 bg-card text-card-foreground px-4">
      {Array(10).map((_, index) => (
        <Skeleton key={index} className="h-80 w-full" />
      ))}
    </div>
  )
}

export default SkeletonCardList
