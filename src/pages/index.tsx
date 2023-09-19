import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

import Head from 'next/head'

import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'

import { Header } from '@/components/layout/Header'

import { ProductInfoProps, ProductsProps } from '@/types/product'
import { formatValue } from '@/utils/formatValue'

import { Carousel } from '@/components/new-ds/Carousel'
import { CategoryCard } from '@/components/new-ds/CategoryCard'
import { mockCarousel } from '@/utils/mock'
import { CategoryByFilter } from '@/components/new-ds/CategoryByFilter'
import { Footer } from '@/components/layout/Footer'

export default function Home({ products }: ProductsProps) {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const [scrollY, setScrollY] = useState(0)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{`Home`}</title>
      </Head>

      <Header lengthCart={cart.length} isTop={scrollY < 40} />
      <Carousel />

      <div className="container grid grid-cols-3 gap-8 my-20 md:grid-cols-1">
        {mockCarousel.map((item, index) => (
          <CategoryCard
            key={index}
            description={item.description}
            title={item.title}
            imgUrl={item.img}
          />
        ))}
      </div>

      <CategoryByFilter products={products} />

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
      defaultPrice: price.unit_amount,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
