import { useKeenSlider } from 'keen-slider/react'

import { Container, Card } from './styles'
// import { CardProduct } from '../CardProduct'
import { ProductsProps } from '@/types/product'
import { useEffect, useState } from 'react'
import { DotCorousel } from '../DotCarousel'
import { ButtonCarousel } from '../ButtonCarousel'
import Image from 'next/image'

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
  }, [instanceRef])

  return (
    <>
      <Container ref={sliderRef} className="keen-slider">
        {products.map((product, index) => (
          <Card
            href={`/product?id=${product.id}`}
            title="Abrir produto"
            key={product.id}
            className="keen-slider__slide"
          >
            {index !== 0 && (
              <ButtonCarousel
                orietation="Left"
                onClick={(e) => {
                  e.preventDefault()
                  instanceRef.current?.prev()
                }}
              />
            )}
            <div className="img">
              <Image src={product.imageUrl} width={200} height={200} alt="" />
            </div>
            <div className="info">
              <strong>{product.price}</strong>
              <span>{product.name}</span>
            </div>

            {index + 1 !== products.length && (
              <ButtonCarousel
                orietation="Right"
                onClick={(e) => {
                  e.preventDefault()
                  instanceRef.current?.next()
                }}
              />
            )}
          </Card>
        ))}
      </Container>

      {products.length > 1 && (
        <DotCorousel
          instanceRef={instanceRef}
          currentSlide={currentSlide}
          products={products}
        />
      )}
    </>
  )
}
