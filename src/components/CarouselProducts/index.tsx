import { useKeenSlider } from 'keen-slider/react'

import { Container } from './styles'
import { CardProduct } from '../CardProduct'
import { ProductsProps } from '@/types/product'
import { ButtonCarousel } from '../ButtonCarousel'
import { useEffect } from 'react'

export function CarouselProducts({ products }: ProductsProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 48,
    },
  })

  useEffect(() => {
    instanceRef?.current?.update()
  }, [instanceRef, products])

  return (
    <Container ref={sliderRef} className="keen-slider">
      {products.length > 4 && (
        <ButtonCarousel
          orietation="Left"
          onClick={() => instanceRef.current?.prev()}
        />
      )}
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
      {products.length > 4 && (
        <ButtonCarousel
          orietation="Right"
          onClick={() => instanceRef.current?.next()}
        />
      )}
    </Container>
  )
}
