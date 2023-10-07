'use client'
import { ICartItem } from '@/types/cart'
import { Button } from './ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import { useCartDispatch } from '@/store/context/createCartContext'

type Props = {
  cartItem: ICartItem
  min?: number
  max?: number
  increment?: number
  decrement?: number
} & React.HTMLAttributes<HTMLDivElement>

const CounterCart = ({
  cartItem,
  min = 1,
  increment = 1,
  decrement = 1,
}: Props) => {
  const dispatch = useCartDispatch()

  const handleIncrement = () => {
    dispatch({
      type: 'incrementFromCart',
      payload: { id: cartItem.id, increment },
    })
  }
  const handleDecrement = () => {
    dispatch({
      type: 'decrementFromCart',
      payload: { id: cartItem.id, decrement },
    })
  }

  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center ">
      <div className="flex flex-row items-center space-x-4 justify-between w-full">
        <div className="flex items-center justify-start">
          <Button
            className="bg-muted"
            onClick={
              handleDecrement
              //dispatch({ type: 'removeFromCart', payload: { id: cartItem.id } })
            }
            variant={'ghost'}
            size={'sm'}
          >
            <b className="text-lg">-</b>
          </Button>
          <span className="w-8 md:w-12 text-lg font-semibold outline-none text-center focus-visible:ring-transparent p-0 ">
            {cartItem.quantity}
          </span>
          <Button
            className="bg-muted"
            onClick={handleIncrement}
            variant={'ghost'}
            size={'sm'}
          >
            <b className="text-lg">+</b>
          </Button>
        </div>
        {cartItem && (
          <p className="text-lg font-semibold ">
            {(cartItem.price * cartItem.quantity).toLocaleString('ru-RU') +
              ' $'}
          </p>
        )}
      </div>
    </div>
  )
}

export default CounterCart
