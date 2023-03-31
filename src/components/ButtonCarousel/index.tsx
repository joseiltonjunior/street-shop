import arrowLeft from '@/assets/caret-left.svg'
import arrowRight from '@/assets/caret-right.svg'
import Image from 'next/image'
import { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'

interface ButtonCarouselProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  orietation: 'Left' | 'Right'
}

export function ButtonCarousel({ orietation, ...rest }: ButtonCarouselProps) {
  return (
    <Container {...rest} orientation={orietation}>
      <Image src={orietation === 'Left' ? arrowLeft : arrowRight} alt="" />
    </Container>
  )
}
