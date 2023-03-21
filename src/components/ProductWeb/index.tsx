import { reduxProps } from '@/storage'
import {
  addProduct,
  productProps,
  removeProduct,
} from '@/storage/modules/cart/action'
import { ProductProps } from '@/types/product'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../Button'
import { ImageContainer, ProductContainer, ProductDetails } from './styles'

export function ProductWeb({ product }: ProductProps) {
  const dispatch = useDispatch()

  const [verifyProductAddCart, setVerifyProductAddCart] = useState(false)

  const cart = useSelector<reduxProps, productProps[]>((state) => state.cart)

  const verifyProductCart = useCallback(() => {
    const productToCart = cart.find((item) => item.id === product.id)

    if (productToCart) {
      setVerifyProductAddCart(true)
      return
    }

    setVerifyProductAddCart(false)
  }, [cart, product.id])

  function handleProductCart() {
    if (verifyProductAddCart) {
      dispatch(removeProduct(product))
      setVerifyProductAddCart(false)
      return
    }
    setVerifyProductAddCart(true)
    dispatch(addProduct(product))
  }

  useEffect(() => {
    verifyProductCart()
  }, [verifyProductCart])

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <Button onClick={handleProductCart}>
          {verifyProductAddCart
            ? 'Remover do carrinho'
            : 'Adicionar ao carrinho'}
        </Button>
      </ProductDetails>
    </ProductContainer>
  )
}
