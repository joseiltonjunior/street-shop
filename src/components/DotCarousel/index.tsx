import { ProductsProps } from '@/types/product'
import { KeenSliderInstance, KeenSliderHooks } from 'keen-slider/react'
import { MutableRefObject } from 'react'
import { Container, Dot } from './styles'

interface DotCarouselProps extends ProductsProps {
  instanceRef: MutableRefObject<KeenSliderInstance<
    {},
    {},
    KeenSliderHooks
  > | null>
  currentSlide: number
}

export function DotCorousel({
  products,
  instanceRef,
  currentSlide,
}: DotCarouselProps) {
  return (
    <Container>
      {products.map((product, index) => (
        <Dot
          currentSlide={currentSlide === index}
          key={product.id}
          onClick={() => instanceRef.current?.moveToIdx(index)}
        />
      ))}
    </Container>
  )
}
