import { ProductContainer, ProductDetails } from '@/styles/pages/product'
import Skeleton from 'react-loading-skeleton'

export function SkeletonProduct() {
  return (
    <ProductContainer>
      <Skeleton width={520} height={480} />

      <ProductDetails>
        <h1>
          <Skeleton width={520} height={30} />
        </h1>
        <span>
          <Skeleton width={150} height={30} />
        </span>

        <p>
          <Skeleton width={520} height={100} />
        </p>

        <Skeleton width={520} height={50} />
      </ProductDetails>
    </ProductContainer>
  )
}
