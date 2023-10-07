import CardListProducts from '@/components/CardListProducts'
import SkeletonCardList from '@/components/skeletons/SkeletonCardList'
import React, { Suspense } from 'react'

const CategoryPage = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <section className="w-full h-full px-4 py-10">
      <Suspense fallback={<SkeletonCardList />}>
        <CardListProducts params={params} searchParams={searchParams} />
      </Suspense>
    </section>
  )
}

export default CategoryPage
