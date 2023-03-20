import { GetStaticProps } from 'next'

import Stripe from 'stripe'
import 'keen-slider/keen-slider.min.css'

import logoCoffeIcon from '@/assets/dcoffee-logo.png'

import { stripe } from '@/lib/stripe'

import { Container, ContentWeb, ContentMobile } from '@/styles/pages/home'
import { HomeWeb } from '@/components/HomeWeb'
import { HomeMobile } from '@/components/HomeMobile'
import { HomeProps } from '@/types/home'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '@/styles/pages/app'
import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { productProps } from '@/storage/modules/cart/action'
import { CartButton } from '@/components/CartButton'

export default function Home({ products }: HomeProps) {
  const cart = useSelector<reduxProps, productProps[]>((state) => state.cart)

  return (
    <>
      <Head>
        <title>{`Home | D'Coffee Shop`}</title>
      </Head>

      <Header>
        <Image src={logoCoffeIcon} alt="" width={150} />

        <CartButton productLenth={cart.length} href="/carrinho" />
      </Header>

      <Container>
        <ContentWeb>
          <HomeWeb products={products} />
        </ContentWeb>

        <ContentMobile>
          <HomeMobile products={products} />
        </ContentMobile>
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
