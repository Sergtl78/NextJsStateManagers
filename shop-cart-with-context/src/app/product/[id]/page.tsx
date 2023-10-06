import CardSlider from '@/components/CardSlider'
import Counter from '@/components/Counter'
import { getProductById } from '@/lib/fetchData'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id)
  return (
    <section className="flex flex-col w-full px-4 py-4">
      <div className="grid md:grid-cols-2 gap-4 w-full ">
        <CardSlider slides={[product.thumbnail, ...product.images]} />
        <div className="flex flex-col ml-4 h-full justify-between">
          <div className="flex flex-col w-full ">
            <h2 className="h2">{product.title}</h2>
            <p>Description:</p>
            <p>{product.description}</p>
          </div>
          <Counter product={product} />
        </div>
      </div>
      <div className="h-[1px] w-full bg-border px-4 my-4" />
    </section>
  )
}

ProductPage
