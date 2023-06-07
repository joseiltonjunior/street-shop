import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { HomeContainer, Product } from './styles'

import { ProductsProps } from '@/types/product'
import { ButtonCarousel } from '../ButtonCarousel'

export function BestSellerCarousel({ products }: ProductsProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    loop: true,
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
            title="Abrir produto"
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
    </>
  )
}
