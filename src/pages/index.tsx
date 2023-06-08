import { useCallback, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

import Stripe from 'stripe'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'

import Head from 'next/head'

import { useDispatch, useSelector } from 'react-redux'
import { reduxProps } from '@/storage'

import { Header } from '@/components/layout/Header'

import { setProducts } from '@/storage/modules/products/action'

import { CarouselProducts } from '@/components/CarouselProducts'
import { CarouselProductsMobile } from '@/components/CarouselProductsMobile'
import { ContentWeb } from '@/components/ContentWeb'
import { ContentMobile } from '@/components/ContentMobile'
import { ProductInfoProps, ProductsProps } from '@/types/product'
import { formatValue } from '@/utils/formatValue'
import { Footer } from '@/components/layout/Footer'

import { GridProductSecondary } from '@/components/GridProductSecondary'
import { GridProductMain } from '@/components/GridProductMain'

export default function Home({ products }: ProductsProps) {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const [bestSeller, setBestSeller] = useState<ProductInfoProps[]>()

  const dispatch = useDispatch()

  const filterProducts = useCallback(() => {
    const coffeeList = products.filter(
      (product) => product.unitLabel === 'cafe',
    )

    setBestSeller(coffeeList)
  }, [products])

  useEffect(() => {
    dispatch(setProducts(products))
    filterProducts()
  }, [dispatch, filterProducts, products])

  return (
    <>
      <Head>
        <title>{`Home | D'Coffee Shop`}</title>
      </Head>

      <Header buttonCart lengthCart={cart.length} inputSearch isLink isUser />

      <main className="overflow-hidden w-full">
        {bestSeller && (
          <div className="grid grid-cols-3 md:grid-cols-1">
            <GridProductMain product={bestSeller[1]} />

            <aside className="flex flex-col">
              <GridProductSecondary product={bestSeller[0]} />

              <GridProductSecondary product={bestSeller[3]} bkgd="#79ca28" />
            </aside>
          </div>
        )}

        {products && (
          <>
            <ContentWeb>
              <CarouselProducts products={products} />
            </ContentWeb>
            <ContentMobile>
              <CarouselProductsMobile products={products} />
            </ContentMobile>
          </>
        )}
      </main>
      <Footer />
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
      price: formatValue(price.unit_amount!),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
