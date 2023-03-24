import { Container, Button, ContentQuantity } from './styles'

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
      <Button sub onClick={() => handleQuantity('sub')}>
        -
      </Button>
      <ContentQuantity>{quantity}</ContentQuantity>
      <Button add onClick={() => handleQuantity('add')}>
        +
      </Button>
    </Container>
  )
}
