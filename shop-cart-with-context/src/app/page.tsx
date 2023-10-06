import CardListProducts from '@/components/CardListProducts'
import { appData } from '@/lib/dataApp'

export default async function Home({ params }: { params: { slug: string } }) {
  return (
    <section className="flex min-h-[90vh] w-full">
      <div className="flex flex-col gap-2 pt-20 items-center space-y-4">
        <CardListProducts slug={params.slug} />
      </div>
    </section>
  )
}
