import { HomeProps } from '@/types/home'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { HomeContainer, Product, ButtonPrev, ButtonNext } from './styles'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

export function HomeMobile({ products }: HomeProps) {
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
          // href={`/product/${product.id}`}
          // prefetch={false}
        >
          <div>
            {index !== 0 && (
              <ButtonPrev onClick={() => instanceRef.current?.prev()}>
                <CaretLeft size={30} />
              </ButtonPrev>
            )}

            <Image src={product.imageUrl} width={520} height={480} alt="" />

            {index + 1 !== products.length && (
              <ButtonNext onClick={() => instanceRef.current?.next()}>
                <CaretRight size={30} />
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
