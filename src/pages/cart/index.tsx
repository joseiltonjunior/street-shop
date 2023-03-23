import { Breadcrumb } from '@/components/Bradcrum'

import { reduxProps } from '@/storage'
import { productProps, removeProduct } from '@/storage/modules/cart/action'
import { ButtonPrev, Header } from '@/styles/pages/app'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'

import { useToast } from '@/hooks/useToast'

import returnIcon from '@/assets/arrow-u-up-left.svg'
import emptyCartIcon from '@/assets/luffy-confuso.png'
import { Button } from '@/components/Button'

import logoCoffeIcon from '@/assets/dcoffee-logo.png'

import {
  Container,
  Product,
  TotalContent,
  ProductsContent,
  EmptyCartContent,
} from '@/styles/pages/cart'

export default function Carrinho() {
  const cart = useSelector<reduxProps, productProps[]>((state) => state.cart)

  const [totalValueCart, setTotalValueCart] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { showToast } = useToast()
  const dispatch = useDispatch()

  const handleValueCart = useCallback(() => {
    const filterPrice = cart.map((product) => {
      const value = product.price.replace('R$', '').replace(',', '.')

      return Number(value) * product.quantity
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

  async function handleBuyProduct() {
    setIsLoading(true)

    const newPurchase = cart.map((item) => {
      return {
        price: item.defaultPriceId,
        quantity: item.quantity,
      }
    })

    await axios
      .post('/api/checkout', { newPurchase })
      .then((result) => {
        const { checkoutUrl } = result.data
        window.location.href = checkoutUrl
      })
      .catch(() => {
        showToast('Falha ao redirecionar ao checkout', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (cart.length > 0) {
      handleValueCart()
    }
  }, [cart.length, handleValueCart])

  return (
    <>
      <Head>
        <title>{`Meu carrinho | D'Coffee Shop`}</title>
      </Head>

      <Header>
        <Link href={'/'}>
          <Image src={logoCoffeIcon} alt="" width={150} />
        </Link>
        <ButtonPrev
          onClick={() => {
            router.back()
          }}
        >
          <Image src={returnIcon} alt="" width={30} height={30} />
        </ButtonPrev>
      </Header>

      <Breadcrumb actualPage="Meu carrinho" />

      {cart.length > 0 ? (
        <Container>
          <ProductsContent>
            {cart.map((product) => (
              <Product key={product.id} href={`/product?id=${product.id}`}>
                <Image src={product.imageUrl} alt="" width={150} height={150} />

                <div className="info">
                  <strong>{product.name}</strong>

                  <div className="price">
                    <span>Qtde: {product.quantity}</span>
                    <strong>{product.price}</strong>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(removeProduct(product))
                  }}
                >
                  <p>Remover</p>
                  <span>X</span>
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

            <Button isLoading={isLoading} onClick={handleBuyProduct}>
              Finalizar compra
            </Button>
          </TotalContent>
        </Container>
      ) : (
        <EmptyCartContent>
          <Image src={emptyCartIcon} alt="" width={300} height={250} />
          <strong>Ooops... seu carrinho está vázio.</strong>
          <Link href="/">Adicionar produtos ao carrinho</Link>
        </EmptyCartContent>
      )}
    </>
  )
}
