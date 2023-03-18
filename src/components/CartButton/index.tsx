import Image from 'next/image'
import { Container } from './styles'
import cartIcon from '@/assets/shopping-cart-simple.svg'

interface cartButtonProps {
  productLenth: number
}

export function CartButton({ productLenth }: cartButtonProps) {
  return (
    <Container>
      <Image src={cartIcon} alt="" />
      <span>{productLenth}</span>
    </Container>
  )
}
