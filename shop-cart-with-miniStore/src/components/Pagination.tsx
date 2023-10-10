import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Pagination = ({
  page,
  limit,
  total,
}: {
  page: number
  limit: number
  total: number
}) => {
  const items = Array.from(
    { length: Math.ceil(total / limit) },
    (_, i) => i + 1
  )

  return (
    <div className=" flex h-10  pb-10">
      <Link
        className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
        href={{ query: { limit, page: 1 } }}
      >
        <Button size={'icon'} variant={'ghost'}>
          {'<<'}
        </Button>
      </Link>
      <Link
        className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
        href={{ query: { limit, page: page - 1 } }}
      >
        <Button size={'icon'} variant={'ghost'}>
          {'<'}
        </Button>
      </Link>

      {items.map((item) => (
        <Link key={item} href={{ query: { limit, page: item } }}>
          <Button
            className={cn(
              item === page ? 'bg-muted' : '',
              item > page + 1 || item < page - 1 ? 'hidden ' : 'block'
            )}
            size={'icon'}
            variant={'ghost'}
          >
            {item}
          </Button>
        </Link>
      ))}
      <Link
        className={
          page === items.length ? 'pointer-events-none opacity-50 ' : ''
        }
        href={{ query: { limit, page: page + 1 } }}
      >
        <Button
          //className={cn(page <= 1 && 'pointer-events-none opacity-50')}
          size={'icon'}
          variant={'ghost'}
        >
          {'>'}
        </Button>
      </Link>
      <Link
        className={
          page === items.length ? 'pointer-events-none opacity-50 ' : ''
        }
        href={{ query: { limit, page: items.length } }}
      >
        <Button
          //className={cn(page <= 1 && 'pointer-events-none opacity-50')}
          size={'icon'}
          variant={'ghost'}
        >
          {'>>'}
        </Button>
      </Link>
    </div>
  )
}

export default Pagination
