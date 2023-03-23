import { HomeProps } from '@/types/home'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { HomeContainer, Product, ButtonPrev, ButtonNext } from './styles'

import caretLeft from '@/assets/caret-left.svg'
import caretRight from '@/assets/caret-right.svg'

export function CarouselMobile({ products }: HomeProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 18,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="ken-slider">
      {products.map((product, index) => (
        <Product
          key={product.id}
          className="keen-slider__slide"
          href={`/product?id=${product.id}`}
          prefetch={false}
        >
          <div>
            {index !== 0 && (
              <ButtonPrev
                onClick={(e) => {
                  e.preventDefault()
                  instanceRef.current?.prev()
                }}
              >
                <Image src={caretLeft} alt="" />
              </ButtonPrev>
            )}

            <Image src={product.imageUrl} width={520} height={480} alt="" />

            {index + 1 !== products.length && (
              <ButtonNext
                onClick={(e) => {
                  e.preventDefault()
                  instanceRef.current?.next()
                }}
              >
                <Image src={caretRight} alt="" />
              </ButtonNext>
            )}
          </div>

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}
