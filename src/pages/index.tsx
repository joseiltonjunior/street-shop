import { GetStaticProps } from 'next'

import Stripe from 'stripe'
import 'keen-slider/keen-slider.min.css'

import logoCoffeIcon from '@/assets/dcoffee-logo.png'

import { stripe } from '@/lib/stripe'

import { Container, ContentWeb, ContentMobile } from '@/styles/pages/home'
import { CarouselWeb } from '@/components/CarouselWeb'
import { CarouselMobile } from '@/components/CarouselMobile'
import { HomeProps } from '@/types/home'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '@/styles/pages/app'
import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { productProps } from '@/storage/modules/cart/action'
import { CartButton } from '@/components/CartButton'
import { Breadcrumb } from '@/components/Bradcrum'
import { useCallback, useState } from 'react'

export default function Home({ products }: HomeProps) {
  const cart = useSelector<reduxProps, productProps[]>((state) => state.cart)

  const [filterProducts, setFilterProducts] = useState<string>('')

  const [productsWithFilter, setProductsWithFilter] = useState<HomeProps>({
    products,
  })

  const addFilterProducts = useCallback(
    (filter: string) => {
      if (filter) {
        const newArray = products.filter((item) => item.unitLabel === filter)

        setFilterProducts(filter)
        setProductsWithFilter({ products: newArray })

        return
      }

      setFilterProducts(filter)
      setProductsWithFilter({ products })
    },
    [products],
  )

  return (
    <Container>
      <Head>
        <title>{`Home | D'Coffee Shop`}</title>
      </Head>

      <Header>
        <Image src={logoCoffeIcon} alt="" width={150} />

        <CartButton productLenth={cart.length} href="/cart" />
      </Header>

      <Breadcrumb
        setFilterProducts={addFilterProducts}
        style={{ marginBottom: '1rem' }}
      />

      <ContentWeb>
        {filterProducts === '' && <CarouselWeb products={products} />}
        {filterProducts === 'cafe' && (
          <CarouselWeb products={productsWithFilter.products} />
        )}
        {filterProducts === 'copo' && (
          <CarouselWeb products={productsWithFilter.products} />
        )}
      </ContentWeb>

      <ContentMobile>
        {filterProducts === '' && <CarouselMobile products={products} />}
        {filterProducts === 'cafe' && (
          <CarouselMobile products={productsWithFilter.products} />
        )}
        {filterProducts === 'copo' && (
          <CarouselMobile products={productsWithFilter.products} />
        )}
      </ContentMobile>
    </Container>
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
