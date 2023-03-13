import { BuyProductProps } from '@/types/product'
import Image from 'next/image'

import { Button } from '../Button'
import { ImageContainer, ProductContainer, ProductDetails } from './styles'

export function ProductWeb({ product, purchase, isLoading }: BuyProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <Button onClick={purchase} isLoading={isLoading}>
          Compar agora
        </Button>
      </ProductDetails>
    </ProductContainer>
  )
}
