import { stripe } from '@/lib/stripe'
import { ProductProps } from '@/types/product'
import { GetServerSideProps } from 'next'

import Stripe from 'stripe'

import { Container, ContentMobile, ContentWeb } from '@/styles/pages/product'
import { ProductWeb } from '@/components/ProductWeb'
import { SkeletonProductWeb } from '@/components/ProductWeb/Skeleton'
import { ProductMobile } from '@/components/ProductMobile'
import { SkeletonProductMobile } from '@/components/ProductMobile/Skeleton'

import Head from 'next/head'
import { Breadcrumb } from '@/components/BreadCrumb'
import { Header } from '@/styles/pages/app'

import logoCoffeIcon from '@/assets/dcoffee-logo.png'

import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { productProps } from '@/storage/modules/cart/action'
import { CartButton } from '@/components/CartButton'
import Image from 'next/image'
import Link from 'next/link'

export default function Product({ product }: ProductProps) {
  const cart = useSelector<reduxProps, productProps[]>((state) => state.cart)

  if (!product) {
    return (
      <Container>
        <ContentWeb>
          <SkeletonProductWeb />
        </ContentWeb>

        <ContentMobile>
          <SkeletonProductMobile />
        </ContentMobile>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <meta name="image" content={product.imageUrl} />
        <title>{`${product.name}  | D'Coffee Shop`}</title>
      </Head>

      <Header>
        <Link href={'/'}>
          <Image src={logoCoffeIcon} alt="" width={150} />
        </Link>
        <CartButton productLenth={cart.length} href="/cart" />
      </Header>
      <Breadcrumb actualPage={product.name} style={{ marginBottom: '1rem' }} />

      <Container>
        <ContentWeb>
          <ProductWeb product={product} />
        </ContentWeb>

        <ContentMobile>
          <ProductMobile product={product} />
        </ContentMobile>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const productId = String(query.id)

  let product = {} || null

  await stripe.products
    .retrieve(productId, {
      expand: ['default_price'],
    })
    .then((result) => {
      const price = result.default_price as Stripe.Price

      product = {
        id: result.id,
        name: result.name,
        imageUrl: result.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: result.description,
        defaultPriceId: price.id,
      }
    })
    .catch(() => {
      product = null
    })

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
  }
}
