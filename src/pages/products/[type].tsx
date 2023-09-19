import { useRouter } from 'next/router'
import { Container } from '@/styles/pages/products'
import { Footer } from '@/components/layout/Footer'
import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { Breadcrumb } from '@/components/layout/BreadCrumb'
import { ProductEnum } from '@/utils/enums/productsEnum'
import { useEffect, useState } from 'react'
// import { CardProduct } from '@/components/CardProduct'
import Head from 'next/head'
import { Header } from '@/components/layout/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function Products() {
  const { query } = useRouter()

  const [listProducts, setListProducts] = useState<ProductInfoProps[]>()

  const param = query.type as 'actionFigure' | 'coffee' | 'cups' | 'all'

  const [title, setTitle] = useState('')

  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const products = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.products,
  )

  useEffect(() => {
    if (param) {
      const filter = products.filter((item) => item.unitLabel === param)
      setTitle(ProductEnum[param])

      if (param === 'all') {
        setListProducts(products)
        return
      }

      setListProducts(filter)
    }
  }, [param, products])

  return (
    <>
      <Head>
        <title>{`Produtos | D'Coffee Shop`}</title>
      </Head>

      <Header lengthCart={cart.length} />
      <Breadcrumb actualPage={title} />
      <Container>
        <main className="h-screen grid grid-cols-4 gap-2 md:grid-cols-1 md:h-auto md:p-3 md:gap-3">
          {listProducts?.map((product) => (
            <Link
              className="bg-gray-500 rounded justify-center h-fit overflow-hidden items-center flex flex-col"
              key={product.id}
              href={`/product?id=${product.id}`}
            >
              <Image
                src={product.imageUrl}
                width={250}
                height={250}
                alt="product"
                className="object-contain transform hover:scale-110 transition duration-300"
              />
              <div className="h-24  justify-center flex flex-col px-4 bg-gray-800 w-full">
                <p className="text-orange-500 font-bold">{product.price}</p>
                <p className="text-gray-300 font-semibold">{product.name}</p>
              </div>
            </Link>
          ))}
        </main>

        <div className="mt-8">
          <Footer />
        </div>
      </Container>
    </>
  )
}
