import { IProduct, IProducts } from '@/types/product'
import { cache } from 'react'

const domain = 'dummyjson.com'

export const getProducts = cache(
  async ({
    slug,
    limit,
    skip,
  }: {
    slug?: string
    limit?: number
    skip?: number
  }): Promise<IProducts> => {
    const res = await fetch(
      slug
        ? `https://${domain}/products/category/${slug}`
        : `https://${domain}/products?limit=${limit}&skip=${skip}`,
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
)

export const getCategories = cache(async (): Promise<string[]> => {
  const res = await fetch(`https://${domain}/products/categories`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
})

export const getProductById = cache(async (id: string): Promise<IProduct> => {
  const res = await fetch(`https://${domain}/products/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
})
