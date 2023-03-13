import Skeleton from 'react-loading-skeleton'
import { ProductContainer, ProductDetails } from '../styles'

export function SkeletonProductMobile() {
  return (
    <ProductContainer>
      <Skeleton width={'100%'} height={280} />

      <ProductDetails>
        <h1>
          <Skeleton width={'100%'} height={28} />
        </h1>
        <span>
          <Skeleton width={50} height={24} />
        </span>

        <p>
          <Skeleton width={'100%'} height={100} />
        </p>

        <Skeleton width={'100%'} height={50} />
      </ProductDetails>
    </ProductContainer>
  )
}
