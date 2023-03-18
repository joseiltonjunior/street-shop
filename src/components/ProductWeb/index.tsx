import { addProduct } from '@/storage/modules/cart/action'
import { BuyProductProps } from '@/types/product'
import Image from 'next/image'
import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { Button } from '../Button'
import { ImageContainer, ProductContainer, ProductDetails } from './styles'

export function ProductWeb({ product, isLoading }: BuyProductProps) {
  const dispatch = useDispatch()

  const [verifyProductAddCart, setVerifyProductAddCart] = useState(false)

  function addProductCart() {
    setVerifyProductAddCart(true)
    dispatch(addProduct(product))
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <Button onClick={addProductCart} isLoading={isLoading}>
          {verifyProductAddCart
            ? 'Remover do carrinho'
            : 'Adicionar ao carrinho'}
        </Button>
      </ProductDetails>
    </ProductContainer>
  )
}
