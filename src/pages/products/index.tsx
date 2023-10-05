import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import Head from 'next/head'
import Stripe from 'stripe'

import { Header } from '@/components/layout/Header'
import { ProductInfoProps, ProductsProps } from '@/types/product'

import { formatReal } from '@/utils/formatReal'
import { GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import { ProductsComponent } from '@/components/new-ds/ProductsComponent'
import { Footer } from '@/components/layout/Footer'

export default function Products({ products }: ProductsProps) {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  return (
    <>
      <Head>
        <title>{`Products | Street Shop`}</title>
      </Head>

      <div className="w-full h-screen flex flex-col">
        <Header lengthCart={cart.length} />
        <main className="my-24 md:my-12 container">
          <ProductsComponent products={products} />
        </main>
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
