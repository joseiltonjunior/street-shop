import { useKeenSlider } from 'keen-slider/react'

import { Container } from './styles'
import { CardProduct } from '../CardProduct'
import { ProductsProps } from '@/types/product'
import { useEffect, useState } from 'react'
import { DotCorousel } from '../DotCarousel'
import { ButtonCarousel } from '../ButtonCarousel'

export function CarouselProductsMobile({ products }: ProductsProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 18,
    },

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  useEffect(() => {
    instanceRef?.current?.update()
  }, [instanceRef, products])

  return (
    <>
      <Container ref={sliderRef} className="keen-slider">
        <ButtonCarousel
          orietation="Left"
          onClick={() => instanceRef.current?.prev()}
        />
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
        <ButtonCarousel
          orietation="Right"
          onClick={() => instanceRef.current?.next()}
        />
      </Container>

      <DotCorousel
        instanceRef={instanceRef}
        currentSlide={currentSlide}
        products={products}
      />
    </>
  )
}
