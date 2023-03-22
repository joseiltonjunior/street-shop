import { Container } from './styles'

interface changeQuantityProps {
  quantity: number
  handleQuantity(key: string): void
}

export function ChangeQuantity({
  quantity,
  handleQuantity,
}: changeQuantityProps) {
  return (
    <Container>
      <button className="sub" onClick={() => handleQuantity('sub')}>
        -
      </button>
      <div>
        <span>{quantity}</span>
      </div>
      <button className="add" onClick={() => handleQuantity('add')}>
        +
      </button>
    </Container>
  )
}
