import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { HomeContainer, Product } from './styles'

import { ProductsProps } from '@/types/product'
import { ButtonCarousel } from '../ButtonCarousel'
import { useState } from 'react'
import { DotCorousel } from '../DotCarousel'

export function BestSellerCarousel({ products }: ProductsProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  return (
    <>
      <HomeContainer ref={sliderRef} className="ken-slider">
        <ButtonCarousel
          orietation="Left"
          onClick={() => instanceRef.current?.prev()}
        />

        {products.map((product) => (
          <Product
            key={product.id}
            className="keen-slider__slide"
            href={`/product?id=${product.id}`}
            prefetch={false}
          >
            <Image src={product.imageUrl} width={480} height={400} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        ))}

        <ButtonCarousel
          orietation="Right"
          onClick={() => instanceRef.current?.next()}
        />
      </HomeContainer>

      <DotCorousel
        instanceRef={instanceRef}
        currentSlide={currentSlide}
        products={products}
      />
    </>
  )
}
