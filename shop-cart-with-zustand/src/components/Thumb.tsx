'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
type PropType = {
  selected: boolean
  imgSrc: string
  index: number
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, onClick } = props

  return (
    <div
      className={cn(
        'embla-thumbs__slide relative w-1/4 min-w-0 pl-4 opacity-50 ',
        selected ? 'opacity-100' : ''
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button appearance-none touch-manipulation block cursor-pointer w-full  transition-opacity "
        type="button"
      >
        <Image
          className="embla-thumbs__slide__img block h-auto w-full object-cover aspect-[4/4] rounded-lg"
          src={imgSrc}
          alt="Your alt text"
          width={400}
          height={400}
        />
      </button>
    </div>
  )
}
