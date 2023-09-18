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

export default function Home({ products }: ProductsProps) {
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const [scrollY, setScrollY] = useState(0)

  const handleScroll = () => {
    setScrollY(window.scrollY)
    console.log(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // Limpe o event listener ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{`Home | Street Shop`}</title>
      </Head>

      <Header lengthCart={cart.length} isTop={scrollY < 40} />
      <Carousel />

      {/* <div className="container flex mt-20 gap-8">
        {mockCarousel.map((item, index) => (
          <CategoryCard
            key={index}
            description={item.description}
            title={item.title}
            imgUrl={item.img}
          />
        ))}
      </div> */}

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
