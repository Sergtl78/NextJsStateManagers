import { IProduct } from './product'

export interface ICartItem
  extends Omit<IProduct, 'description' | 'brand' | 'stock' | 'category'> {
  quantity: number
}

export interface ICart {
  cartItems: ICartItem[]
  totalPrice: number
  discountedTotal: number
  totalProducts: number
  totalQuantity: number
}
