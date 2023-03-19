import { Breadcrumb } from '@/components/Bradcrum'

import { reduxProps } from '@/storage'
import { productProps, removeProduct } from '@/storage/modules/cart/action'
import { Header } from '@/styles/pages/app'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Product,
  TotalContent,
  ProductsContent,
  EmptyCartContent,
} from './styles'
import returnIcon from '@/assets/arrow-u-up-left.svg'
import Link from 'next/link'
import emptyCartIcon from '@/assets/emptyCart.png'
import { Button } from '@/components/Button'
import { useCallback, useEffect, useState } from 'react'

export default function Carrinho() {
  const cart = useSelector<reduxProps, productProps[]>((state) => state.cart)

  const [totalValueCart, setTotalValueCart] = useState<string>()

  const dispatch = useDispatch()

  const handleValueCart = useCallback(() => {
    const filterPrice = cart.map((product) => {
      return parseInt(product.price.replace('R$', ''))
    })

    const total = filterPrice.reduce((total, numero) => {
      return total + numero
    })

    const valueFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total)

    setTotalValueCart(valueFormat)
  }, [cart])

  useEffect(() => {
    if (cart.length > 0) {
      handleValueCart()
    }
  }, [cart.length, handleValueCart])

  return (
    <>
      <Head>
        <title>Meu carrinho | Ignite Shop</title>
      </Head>

      <Header>
        <Breadcrumb nameShirt="Meu carrinho" />

        <Link href="/">
          <Image src={returnIcon} alt="" width={30} height={30} />
        </Link>
      </Header>

      {cart.length > 0 ? (
        <Container>
          <ProductsContent>
            {cart.map((product) => (
              <Product key={product.id}>
                <div>
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={150}
                    height={150}
                  />

                  <strong>{product.name}</strong>
                </div>

                <span>1</span>
                <strong>{product.price}</strong>
                <button onClick={() => dispatch(removeProduct(product))}>
                  Remover
                </button>
              </Product>
            ))}
          </ProductsContent>

          <TotalContent>
            <p>Resumo da compra</p>

            <div>
              <strong>Total</strong>
              <span>{totalValueCart}</span>
            </div>

            <Button>Finalizar compra</Button>
          </TotalContent>
        </Container>
      ) : (
        <EmptyCartContent>
          <Image src={emptyCartIcon} alt="" width={250} height={250} />
          <strong>Ooops... seu carrinho está vázio.</strong>
          <Link href="/">Buscar os melhores produtos</Link>
        </EmptyCartContent>
      )}
    </>
  )
}
