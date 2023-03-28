import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

import Stripe from 'stripe'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'

import { CarouselWeb } from '@/components/CarouselWeb'
import { CarouselMobile } from '@/components/CarouselMobile'
import { HomeProps, ProductInfoProps } from '@/types/home'
import Head from 'next/head'

import { useDispatch, useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { productProps } from '@/storage/modules/cart/action'

import { Header } from '@/components/Header'

import { setProducts } from '@/storage/modules/products/action'
import { CardProduct } from '@/components/CardProduct'

import {
  Container,
  ContentWeb,
  ContentMobile,
  ContentProducts,
} from '@/styles/pages/home'

export default function Home({ products }: HomeProps) {
  const cart = useSelector<reduxProps, productProps[]>((state) => state.cart)
  const [cupsCategory, setCupsCategory] = useState<ProductInfoProps[]>()
  const [coffeeCategory, setCoffeeCategory] = useState<ProductInfoProps[]>()

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(products)
    dispatch(setProducts(products))

    const cupsList = products.filter(
      (product) =>
        product.unitLabel === 'copo' || product.unitLabel === 'garrafa',
    )

    const coffeeList = products.filter(
      (product) => product.unitLabel === 'cafe',
    )

    setCoffeeCategory(coffeeList)
    setCupsCategory(cupsList)
  }, [dispatch, products])

  return (
    <>
      <Head>
        <title>{`Home | D'Coffee Shop`}</title>
      </Head>

      <Header buttonCart={cart.length} inputSearch isLink />

      <Container>
        <h3>Mais vendidos</h3>
        <ContentWeb>
          <CarouselWeb products={products} />
        </ContentWeb>

        <ContentMobile>
          <CarouselMobile products={products} />
        </ContentMobile>

        {/* <h3>Action Figures</h3>
        <ContentProducts>
          {products.map((product) => (
            <CardProduct
              key={product.id}
              imgUrl={product.imageUrl}
              name={product.name}
              price={product.price}
            />
          ))}
        </ContentProducts> */}
        <h3>Cafés</h3>
        <ContentProducts>
          {coffeeCategory?.map((product) => (
            <CardProduct
              key={product.id}
              imgUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              href={`/product?id=${product.id}`}
            />
          ))}
        </ContentProducts>
        <h3>Copos, Canecas e Garrafas</h3>
        <ContentProducts>
          {cupsCategory?.map((product) => (
            <CardProduct
              key={product.id}
              imgUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              href={`/product?id=${product.id}`}
            />
          ))}
        </ContentProducts>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
    active: true,
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      unitLabel: product.unit_label,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
