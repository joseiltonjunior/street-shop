import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { ProductInfoProps, ProductsProps } from '@/types/product'

import Head from 'next/head'
import { Header } from '@/components/layout/Header'

import { formatReal } from '@/utils/formatReal'
import { GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { ProductsComponent } from '@/components/new-ds/ProductsComponent'
import { Footer } from '@/components/layout/Footer'

export default function Products({ products }: ProductsProps) {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  return (
    <>
      <Head>
        <title>{`Produtos | Street Shop`}</title>
      </Head>

      <Header lengthCart={cart.length} />

      <div className="mt-24 h-screen w-screen">
        <ProductsComponent products={products} />
        <Footer />
      </div>
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
      price: formatReal(price.unit_amount!),
      defaultPrice: price.unit_amount,
      metaData: product.metadata,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
