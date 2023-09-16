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

// import { Offers } from '@/components/Offers'

import { ProductInfoProps, ProductsProps } from '@/types/product'
import { formatValue } from '@/utils/formatValue'
// import { Footer } from '@/components/layout/Footer'

// import { GridProductSecondary } from '@/components/GridProductSecondary'
// import { GridProductMain } from '@/components/GridProductMain'

// import { CategoryItems } from '@/components/CategoryItems'

// import { Container } from '@/styles/pages/home'
// import { ProductForPrice } from '@/components/ProductForPrice'
// import { ProductForCategory } from '@/components/ProductsForCategory'
import { Carousel } from '@/components/Carousel'

export default function Home({ products }: ProductsProps) {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const [upTo50, setUpTo50] = useState<ProductInfoProps[]>()
  const [upTo100, setUpTo100] = useState<ProductInfoProps[]>()
  const [up150, setUp150] = useState<ProductInfoProps[]>()

  const [bestSeller, setBestSeller] = useState<ProductInfoProps[]>()

  const dispatch = useDispatch()

  const filterProducts = useCallback(() => {
    const coffeeList = products.filter(
      (product) => product.unitLabel === 'coffee',
    )

    const itemsUpTo50 = products.filter(
      (product) => product.defaultPrice <= 5000,
    )

    const itemsUpTo100 = products.filter(
      (product) =>
        product.defaultPrice >= 5000 && product.defaultPrice <= 10000,
    )

    const itemsUp150 = products.filter(
      (product) => product.defaultPrice >= 15000,
    )

    setUp150(itemsUp150)
    setUpTo100(itemsUpTo100)
    setUpTo50(itemsUpTo50)
    setBestSeller(coffeeList)
  }, [products])

  useEffect(() => {
    dispatch(setProducts(products))
    filterProducts()
  }, [dispatch, filterProducts, products])

  return (
    <>
      <Head>
        <title>{`Home | Street Shop`}</title>
      </Head>

      <Header buttonCart lengthCart={cart.length} inputSearch isLink isUser />
      <Carousel />
      {/* <Container className="bg-gray-900 text-gray-100">
        <div className="md:px-3">
          <div className="mt-4">
            <strong className="text-2xl">
              {String('Ofertas da semana').toLocaleUpperCase()}
            </strong>
            <Offers products={products} />
          </div>

          {bestSeller && (
            <div className="ml-auto mr-auto mt-4">
              <strong className="text-2xl">
                {String('Mais vendidos').toLocaleUpperCase()}
              </strong>
              <div className="grid grid-cols-3 md:grid-cols-1 mt-2 rounded overflow-hidden">
                <GridProductMain product={bestSeller[1]} />
                <div className="flex flex-col">
                  <GridProductSecondary product={bestSeller[3]} dark />
                  <GridProductSecondary product={bestSeller[0]} dark />
                </div>
              </div>
            </div>
          )}

          <main className="overflow-hidden w-full flex flex-col  mt-8">
            <div className="w-full flex flex-col gap-6">
              {upTo50 && upTo100 && up150 && (
                <div className="flex flex-col justify-center ">
                  <strong className="text-lg text-left">
                    {String(
                      'Encontre o presente no valor que cabe no seu bolso',
                    ).toLocaleUpperCase()}
                  </strong>
                  <div className="flex gap-4 mt-2 md:flex-col">
                    <ProductForPrice
                      imgUrl={upTo50[0].imageUrl}
                      text="Até R$ 50"
                      price="50"
                    />

                    <ProductForPrice
                      imgUrl={upTo100[0].imageUrl}
                      text=" Até R$ 100"
                      price="100"
                    />

                    <ProductForPrice
                      imgUrl={up150[0].imageUrl}
                      text=" Acima de R$ 150"
                      price="150"
                    />
                  </div>
                </div>
              )}

              <CategoryItems title="Categorias" products={products} />

              <div className="flex flex-col gap-6">
                <ProductForCategory
                  title="para os apaixonados por café"
                  products={products.filter(
                    (item) => item.unitLabel === 'coffee',
                  )}
                />
                <ProductForCategory
                  title="o item que falta na sua decoração"
                  products={products.filter(
                    (item) => item.unitLabel === 'actionFigure',
                  )}
                />
                <ProductForCategory
                  title="para o seu dia a dia"
                  products={products.filter(
                    (item) => item.unitLabel === 'cups',
                  )}
                />
              </div>
            </div>
          </main>
        </div>

        <div className="mt-8">
          <Footer />
        </div>
      </Container> */}
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
