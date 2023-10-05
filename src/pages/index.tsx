import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

import Head from 'next/head'

import { useDispatch, useSelector } from 'react-redux'
import { reduxProps } from '@/storage'

import { Header } from '@/components/layout/Header'

import { ProductInfoProps, ProductsProps } from '@/types/product'
import { formatReal } from '@/utils/formatReal'

import { Carousel } from '@/components/new-ds/Carousel'
import { CategoryCard } from '@/components/new-ds/CategoryCard'
import { mockCarousel } from '@/utils/mock'
import { ProductsComponent } from '@/components/new-ds/ProductsComponent'
import { Footer } from '@/components/layout/Footer'

import { filterCategoryProducts } from '@/storage/modules/filterCategoryProducts/action'

export default function Home({ products }: ProductsProps) {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const dispatch = useDispatch()

  const [scrollY, setScrollY] = useState(0)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }

  function handleImgCategory(type: 'tshirts' | 'pants' | 'shoes') {
    if (type === 'tshirts') {
      const filter = products.filter(
        (product) => product.unitLabel === 'tshirts',
      )
      return filter[0].imageUrl
    } else if (type === 'pants') {
      const filter = products.filter((product) => product.unitLabel === 'pants')
      return filter[0].imageUrl
    }
    const filter = products.filter((product) => product.unitLabel === 'shoes')
    return filter[0].imageUrl
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

      <div className="w-full h-screen flex flex-col">
        <Header lengthCart={cart.length} isTop={scrollY < 40} />

        <main>
          <Carousel />
          <div className="container mb-32">
            <div className="grid grid-cols-3 gap-8 my-20 md:grid-cols-1">
              <CategoryCard
                urlDirection="/products"
                description={mockCarousel[0].description}
                title={mockCarousel[0].title}
                imgUrl={handleImgCategory('tshirts')}
                onClick={() =>
                  dispatch(filterCategoryProducts({ filter: 'tshirts' }))
                }
              />

              <CategoryCard
                urlDirection="/products"
                description={mockCarousel[1].description}
                title={mockCarousel[1].title}
                imgUrl={handleImgCategory('pants')}
                onClick={() =>
                  dispatch(filterCategoryProducts({ filter: 'pants' }))
                }
              />

              <CategoryCard
                urlDirection="/products"
                description={mockCarousel[2].description}
                title={mockCarousel[2].title}
                imgUrl={handleImgCategory('shoes')}
                onClick={() =>
                  dispatch(filterCategoryProducts({ filter: 'shoes' }))
                }
              />
            </div>
            <ProductsComponent products={products} isTitle />
          </div>
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
