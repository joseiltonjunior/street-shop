import Image from 'next/image'
import { AnchorHTMLAttributes, HTMLAttributeAnchorTarget } from 'react'

import { Container } from './styles'

interface CardProductProps
  extends AnchorHTMLAttributes<HTMLAttributeAnchorTarget> {
  name: string
  price: string
  imgUrl: string
}

export function CardProduct({
  imgUrl,
  name,
  price,
  href = '/',
}: CardProductProps) {
  return (
    <Container href={href} prefetch={false}>
      <div className="img">
        <Image src={imgUrl} width={200} height={200} alt="" />
      </div>
      <div className="info">
        <strong>{price}</strong>
        <span>{name}</span>
      </div>
    </Container>
  )
}
