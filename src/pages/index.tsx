import { useCallback, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

import Stripe from 'stripe'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'

import { BestSellerCarousel } from '@/components/BestSellerCarousel'
import { BestSellerCarouselMobile } from '@/components/BestSellerCarouselMobile'

import Head from 'next/head'

import { useDispatch, useSelector } from 'react-redux'
import { reduxProps } from '@/storage'

import { Header } from '@/components/Header'

import { setProducts } from '@/storage/modules/products/action'

import { Container } from '@/styles/pages/home'
import { CarouselProducts } from '@/components/CarouselProducts'
import { CarouselProductsMobile } from '@/components/CarouselProductsMobile'
import { ContentWeb } from '@/components/ContentWeb'
import { ContentMobile } from '@/components/ContentMobile'
import { ProductInfoProps, ProductsProps } from '@/types/product'
import { formatValue } from '@/utils/formatValue'
import { Footer } from '@/components/Footer'

export default function Home({ products }: ProductsProps) {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const [cupsCategory, setCupsCategory] = useState<ProductInfoProps[]>()
  const [bestSeller, setBestSeller] = useState<ProductInfoProps[]>()
  const [coffeeCategory, setCoffeeCategory] = useState<ProductInfoProps[]>()
  const [actionFigureCategory, setActionFigureCategory] =
    useState<ProductInfoProps[]>()

  const dispatch = useDispatch()

  const filterProducts = useCallback(() => {
    const cupsList = products.filter(
      (product) =>
        product.unitLabel === 'copo' || product.unitLabel === 'garrafa',
    )

    const coffeeList = products.filter(
      (product) => product.unitLabel === 'cafe',
    )

    const actionFigureList = products.filter(
      (product) => product.unitLabel === 'actionFigure',
    )

    setBestSeller([coffeeList[0], coffeeList[1], cupsList[0], cupsList[1]])

    setActionFigureCategory(actionFigureList)
    setCoffeeCategory(coffeeList)
    setCupsCategory(cupsList)
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

      <Container>
        {bestSeller && (
          <div className="mt-8">
            <h3>Mais vendidos</h3>
            <ContentWeb>
              <BestSellerCarousel products={bestSeller} />
            </ContentWeb>

            <ContentMobile>
              <BestSellerCarouselMobile products={bestSeller} />
            </ContentMobile>
          </div>
        )}

        {actionFigureCategory && (
          <div className="mt-12">
            <h3>Action Figures</h3>
            <ContentWeb>
              <CarouselProducts products={actionFigureCategory} />
            </ContentWeb>
            <ContentMobile>
              <CarouselProductsMobile products={actionFigureCategory} />
            </ContentMobile>
          </div>
        )}

        {coffeeCategory && (
          <div className="mt-12">
            <h3>Cafés</h3>
            <ContentWeb>
              <CarouselProducts products={coffeeCategory} />
            </ContentWeb>
            <ContentMobile>
              <CarouselProductsMobile products={coffeeCategory} />
            </ContentMobile>
          </div>
        )}

        {cupsCategory && (
          <div className="mt-12">
            <h3>Copos, Canecas e Garrafas</h3>
            <ContentWeb>
              <CarouselProducts products={cupsCategory} />
            </ContentWeb>
            <ContentMobile>
              <CarouselProductsMobile products={cupsCategory} />
            </ContentMobile>
          </div>
        )}
      </Container>
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
