import { IProduct } from './product'

export interface CartItem
  extends Omit<IProduct, 'description' | 'brand' | 'stock' | 'category'> {
  quantity: number
}

export interface ICart {
  cartItems: CartItem[]
  totalPrice: number
  discountedTotal: number
  totalProducts: number
  totalQuantity: number
}
