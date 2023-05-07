import { ProductContainer, ProductDetails } from '@/styles/pages/product'
import Skeleton from 'react-loading-skeleton'
import { Container } from './styles'

export function SkeletonProduct() {
  return (
    <Container>
      <ProductContainer>
        <Skeleton width={'100%'} height={480} className="responsive" />

        <ProductDetails>
          <h1>
            <Skeleton width={'100%'} height={30} />
          </h1>
          <span>
            <Skeleton width={'100%'} height={30} />
          </span>

          <p>
            <Skeleton width={'100%'} height={100} />
          </p>

          <Skeleton width={'100%'} height={50} />
        </ProductDetails>
      </ProductContainer>
    </Container>
  )
}
