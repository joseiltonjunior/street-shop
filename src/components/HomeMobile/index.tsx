import { HomeProps } from '@/types/home'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { HomeContainer, Product } from './styles'

export function HomeMobile({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 18,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="ken-slider">
      {products.map((product) => (
        <Product
          key={product.id}
          className="keen-slider__slide"
          // href={`/product/${product.id}`}
          // prefetch={false}
        >
          <Image src={product.imageUrl} width={520} height={480} alt="" />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}
