import { useKeenSlider } from 'keen-slider/react'

import { Container } from './styles'
import { CardProduct } from '../CardProduct'
import { ProductsProps } from '@/types/product'

export function CarouselProducts({ products }: ProductsProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 48,
    },
  })

  return (
    <Container ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <CardProduct
          className="keen-slider__slide"
          key={product.id}
          imgUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          href={`/product?id=${product.id}`}
        />
      ))}
    </Container>
  )
}
