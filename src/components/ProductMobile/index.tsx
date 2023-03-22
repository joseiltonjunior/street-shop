import { reduxProps } from '@/storage'
import {
  addProduct,
  changeQuantity,
  productProps,
  removeProduct,
} from '@/storage/modules/cart/action'
import { ProductProps } from '@/types/product'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../Button'
import { ChangeQuantity } from '../ChangeQuantity'
import { ImageContainer, ProductContainer, ProductDetails } from './styles'

export function ProductMobile({ product }: ProductProps) {
  const dispatch = useDispatch()
  const [verifyProductAddCart, setVerifyProductAddCart] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const cart = useSelector<reduxProps, productProps[]>((state) => state.cart)

  const verifyProductCart = useCallback(() => {
    const productToCart = cart.find((item) => item.id === product.id)

    if (productToCart) {
      setQuantity(productToCart.quantity)
      setVerifyProductAddCart(true)
      return
    }

    setVerifyProductAddCart(false)
  }, [cart, product.id])

  function handleProductCart() {
    if (verifyProductAddCart) {
      dispatch(removeProduct(product))
      setVerifyProductAddCart(false)
      setQuantity(1)
      return
    }
    setVerifyProductAddCart(true)
    dispatch(addProduct({ ...product, quantity }))
  }

  function handleQuantity(param: 'add' | 'sub') {
    if (param === 'add' && quantity < 10) {
      setQuantity(quantity + 1)
      dispatch(changeQuantity({ ...product, quantity: quantity + 1 }))
    } else if (param === 'sub' && quantity > 1) {
      setQuantity(quantity - 1)
      dispatch(changeQuantity({ ...product, quantity: quantity - 1 }))
    }
  }

  useEffect(() => {
    verifyProductCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>

        <span style={{ marginBottom: '1rem' }}>{product.price}</span>

        {verifyProductAddCart && (
          <ChangeQuantity quantity={quantity} handleQuantity={handleQuantity} />
        )}

        <p style={{ marginBottom: '1rem' }}>{product.description}</p>

        <Button onClick={handleProductCart}>
          {verifyProductAddCart
            ? 'Remover do carrinho'
            : 'Adicionar ao carrinho'}
        </Button>
      </ProductDetails>
    </ProductContainer>
  )
}
