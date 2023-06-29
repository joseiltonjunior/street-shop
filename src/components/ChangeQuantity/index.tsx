import { HTMLAttributes } from 'react'
import { Container } from './styles'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

interface changeQuantityProps extends HTMLAttributes<HTMLDivElement> {
  quantity: number
  handleQuantity(key: string): void
}

export function ChangeQuantity({
  quantity,
  handleQuantity,
  ...rest
}: changeQuantityProps) {
  return (
    <Container {...rest}>
      <button
        onClick={() => handleQuantity('sub')}
        className="bg-orange-500 h-full w-10 flex items-center justify-center rounded-tl-lg rounded-bl-lg"
      >
        <AiFillCaretLeft size={20} className="fill-gray-500" />
      </button>
      <strong className="bg-gray-500 h-full flex items-center justify-center w-12 text-gray-100">
        {quantity}
      </strong>
      <button
        onClick={() => handleQuantity('add')}
        className="bg-orange-500 h-full w-10 flex items-center justify-center rounded-tr-lg rounded-br-lg"
      >
        <AiFillCaretRight size={20} className="fill-gray-500" />
      </button>
    </Container>
  )
}
