import { GetStaticProps } from 'next'

import Stripe from 'stripe'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'

import { Container, ContentWeb, ContentMobile } from '@/styles/pages/home'
import { HomeWeb } from '@/components/HomeWeb'
import { HomeMobile } from '@/components/HomeMobile'
import { HomeProps } from '@/types/home'
import Head from 'next/head'

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

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
