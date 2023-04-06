import { Container } from './styles'
import { CardProduct } from '../CardProduct'
import { ProductsProps } from '@/types/product'
import { ButtonCarousel } from '../ButtonCarousel'

export function CarouselProducts({ products }: ProductsProps) {
  return (
    <Container>
      {products.length > 4 && <ButtonCarousel orietation="Left" />}
      {products.map((product) => (
        <CardProduct
          key={product.id}
          imgUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          href={`/product?id=${product.id}`}
        />
      ))}
      {products.length > 4 && <ButtonCarousel orietation="Right" />}
    </Container>
  )
}
