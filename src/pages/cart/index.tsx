import { Breadcrumb } from '@/components/BreadCrumb'

import { reduxProps } from '@/storage'
import { changeQuantity, removeProduct } from '@/storage/modules/cart/action'

import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

import axios from 'axios'

import { useToast } from '@/hooks/useToast'

import emptyCartIcon from '@/assets/luffy-confuso.png'

import { Button } from '@/components/Button'

import { Header } from '@/components/Header'
import { ProductInfoProps } from '@/types/product'
import arrowIcon from '@/assets/caret-left-triangle.svg'

import {
  Container,
  Product,
  TotalContent,
  ProductsContent,
  EmptyCartContent,
  ButtonQuantity,
  ButtonRemoveProduct,
  ProductInfoContent,
  QuantityContent,
  RowContent,
  NameProduct,
} from '@/styles/pages/cart'

export default function Carrinho() {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const [totalValueCart, setTotalValueCart] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

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
        // const { checkoutUrl } = result.data
        console.log(result.data)
        // window.location.href = checkoutUrl
      })
      .catch((e) => {
        console.log(e)
        showToast('Falha ao redirecionar ao checkout', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  function handleQuantity(param: 'add' | 'sub', product: ProductInfoProps) {
    if (param === 'add' && product.quantity < 10) {
      dispatch(changeQuantity({ ...product, quantity: product.quantity + 1 }))
    } else if (param === 'sub' && product.quantity > 1) {
      dispatch(changeQuantity({ ...product, quantity: product.quantity - 1 }))
    } else if (param === 'sub' && product.quantity === 1) {
      dispatch(removeProduct(product))
    }
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

      <Header />

      <Breadcrumb actualPage="Meu carrinho" />

      {cart.length > 0 ? (
        <Container>
          <ProductsContent>
            {cart
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((product) => (
                <Product key={product.id} href={`/product?id=${product.id}`}>
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={100}
                    height={100}
                  />

                  <ProductInfoContent>
                    <RowContent>
                      <NameProduct>{product.name}</NameProduct>
                      <strong>{product.price}</strong>
                    </RowContent>

                    <RowContent>
                      <QuantityContent>
                        <ButtonQuantity
                          onClick={(e) => {
                            e.preventDefault()
                            handleQuantity('sub', product)
                          }}
                        >
                          <Image src={arrowIcon} alt="" />
                        </ButtonQuantity>
                        <span>Qtde: {product.quantity}</span>
                        <ButtonQuantity
                          increment
                          onClick={(e) => {
                            e.preventDefault()
                            handleQuantity('add', product)
                          }}
                        >
                          <Image src={arrowIcon} alt="" />
                        </ButtonQuantity>
                      </QuantityContent>

                      <ButtonRemoveProduct
                        onClick={(e) => {
                          e.preventDefault()
                          dispatch(removeProduct(product))
                        }}
                      >
                        Remover
                      </ButtonRemoveProduct>
                    </RowContent>
                  </ProductInfoContent>
                </Product>
              ))}
          </ProductsContent>

          <TotalContent>
            <p>Resumo da compra</p>

            <div className="value">
              <strong>Total</strong>
              <span>{totalValueCart}</span>
            </div>

            <div className="alert">
              <strong>Atenção: </strong>
              <span>
                A compra e os produtos são fictícios e para testar o fluxo de
                pagamento, na hora de preencher os dados do cartão utilizar o
                número de cartão 4242 4242 4242 4242 (Cartão teste), os outros
                campos podem ser dados aleartórios válidos.
              </span>
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
