import CardListProducts from '@/components/CardListProducts'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

const CategoryPage = ({ params }: Props) => {
  return (
    <section className="w-full h-full px-4 py-6">
      <CardListProducts slug={params.slug} />
    </section>
  )
}

export default CategoryPage
