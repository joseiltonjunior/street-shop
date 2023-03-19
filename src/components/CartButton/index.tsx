import Image from 'next/image'
import { Container } from './styles'
import cartIcon from '@/assets/shopping-cart-simple.svg'

import { LinkProps } from 'next/link'

interface cartButtonProps extends LinkProps {
  productLenth: number
}

export function CartButton({ productLenth, ...rest }: cartButtonProps) {
  return (
    <Container {...rest}>
      <Image src={cartIcon} alt="" />
      <span>{productLenth}</span>
    </Container>
  )
}
