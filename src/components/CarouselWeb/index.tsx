import { HomeProps } from '@/types/home'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { HomeContainer, Product, ButtonPrev, ButtonNext } from './styles'
import arrowLeft from '@/assets/caret-left.svg'
import arrowRight from '@/assets/caret-right.svg'

export function CarouselWeb({ products }: HomeProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    loop: true,
  })

  return (
    <HomeContainer ref={sliderRef} className="ken-slider">
      <ButtonPrev onClick={() => instanceRef.current?.prev()}>
        <Image src={arrowLeft} alt="" />
      </ButtonPrev>
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
      <ButtonNext>
        <Image
          src={arrowRight}
          alt=""
          onClick={() => instanceRef.current?.next()}
        />
      </ButtonNext>
    </HomeContainer>
  )
}
