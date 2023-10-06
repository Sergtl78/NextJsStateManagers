import { IProduct, IProducts } from '@/types/product'

const domain = 'dummyjson.com'

export async function getProducts(slug?: string): Promise<IProducts> {
  const res = await fetch(
    slug
      ? `https://${domain}/products/category/${slug}`
      : `https://${domain}/products`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`https://${domain}/products/categories`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function getProductById(id: string): Promise<IProduct> {
  const res = await fetch(`https://${domain}/products/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
