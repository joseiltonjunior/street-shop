import Image from 'next/image'

import { AnchorHTMLAttributes } from 'react'

import { Container } from './styles'

interface CardProductProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string
  price: string
  imgUrl: string
}

export function CardProduct({
  imgUrl,
  name,
  price,
  href = '/',
  ...rest
}: CardProductProps) {
  return (
    <Container {...rest} href={href} prefetch={false}>
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
