import { Breadcrumb } from '@/components/layout/BreadCrumb'

import { reduxProps } from '@/storage'
import { changeQuantity, removeProduct } from '@/storage/modules/cart/action'

import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

import emptyCartIcon from '@/assets/luffy-confuso.png'

import { Button } from '@/components/form/Button'

import { Header } from '@/components/layout/Header'
import { ProductInfoProps } from '@/types/product'

import {
  Container,
  Product,
  ProductsContent,
  EmptyCartContent,
  ButtonRemoveProduct,
  ProductInfoContent,
  QuantityContent,
  RowContent,
  NameProduct,
} from '@/styles/pages/cart'

import { useRouter } from 'next/router'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

export default function Carrinho() {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const [totalValueCart, setTotalValueCart] = useState<string>()

  const dispatch = useDispatch()
  const router = useRouter()

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

      <Header isUser />

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
                      <QuantityContent className="gap-2">
                        <button
                          className="bg-orange-500 text-gray-500 items-center justify-center flex rounded-full w-5 h-5"
                          onClick={(e) => {
                            e.preventDefault()
                            handleQuantity('sub', product)
                          }}
                        >
                          <AiFillCaretLeft size={14} />
                        </button>
                        <span>Qtde: {product.quantity}</span>
                        <button
                          className="bg-orange-500 text-gray-500 items-center justify-center flex rounded-full w-5 h-5"
                          onClick={(e) => {
                            e.preventDefault()
                            handleQuantity('add', product)
                          }}
                        >
                          <AiFillCaretRight size={14} />
                        </button>
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

          <div className="bg-gray-500 flex flex-col p-3 h-80 md:h-fit md:mt-auto gap-4 rounded-md md:rounded-b-none">
            <div className="flex flex-col gap-4">
              <strong className="text-xl">Resumo da compra</strong>

              <div className="flex justify-between">
                <strong className="text-xl">Total</strong>
                <strong className="text-lg text-orange-500">
                  {totalValueCart}
                </strong>
              </div>
            </div>

            <div className="w-full mt-auto">
              <Button
                onClick={() => router.push('/checkout')}
                variant="secondary"
              >
                Comprar agora
              </Button>
            </div>
          </div>
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
