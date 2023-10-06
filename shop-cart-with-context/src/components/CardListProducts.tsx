import { getProducts } from '@/lib/fetchData'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { StarIcon } from '@radix-ui/react-icons'
import CartIcon from './CartIcon'
import ButtonAddCart from './ButtonAddCart'

type Props = {
  slug: string | undefined
}

const CardListProducts = async ({ slug }: Props) => {
  const { products } = await getProducts(slug)

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 bg-card text-card-foreground px-4">
      {products?.map((product) => (
        <div
          key={product.id}
          className="flex flex-1 flex-col  w-full h-full rounded-lg overflow-hidden borders shadow-md"
        >
          <div className="overflow-hidden flex  w-full">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={400}
                height={300}
                className={cn(
                  'h-auto w-auto object-cover transition-all hover:scale-105 mb-2 rounded-lg',
                  'aspect-[4/4]'
                )}
              />
            </Link>
          </div>
          <div className="flex flex-1 flex-col px-4 py-2 justify-between">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row mt-1 text-sm">
                <StarIcon className="w-5 h-5 fill-yellow-500 stroke-yellow-500 mr-2" />
                <b>{product.rating === 0 ? 0 : product.rating.toFixed(1)}</b>
              </div>
              <h3 className="text-sm font-semibold leading-none ">
                {product.title}
              </h3>
            </div>
            <div className="flex w-full items-center justify-between py-2">
              <h3 className="text-lg font-semibold leading-none ">{`${product.price.toLocaleString(
                'ru-RU'
              )} $`}</h3>
              <ButtonAddCart product={product} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardListProducts
