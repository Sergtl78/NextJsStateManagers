import CardListProducts from '@/components/CardListProducts'

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <section className="flex min-h-[90vh] w-full">
      <div className="flex flex-col gap-2 py-10 items-center space-y-4">
        <CardListProducts params={params} searchParams={searchParams} />
      </div>
    </section>
  )
}
