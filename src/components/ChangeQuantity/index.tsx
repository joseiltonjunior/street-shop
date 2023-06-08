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
        className="bg-indigo-800 h-full w-10 flex items-center justify-center rounded-tl-lg rounded-bl-lg"
      >
        <AiFillCaretLeft size={20} />
      </button>
      <span className="bg-[#202024] h-full flex items-center justify-center w-12">
        {quantity}
      </span>
      <button
        onClick={() => handleQuantity('add')}
        className="bg-indigo-800 h-full w-10 flex items-center justify-center rounded-tr-lg rounded-br-lg"
      >
        <AiFillCaretRight size={20} />
      </button>
    </Container>
  )
}
