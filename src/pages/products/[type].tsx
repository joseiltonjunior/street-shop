import { useRouter } from 'next/router'
import { Container } from '@/styles/pages/products'
import { Header } from '@/components/Header'
import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { Breadcrumb } from '@/components/BreadCrumb'
import { ProductEnum } from '@/utils/enums/productsEnum'
import { useEffect, useState } from 'react'
import { CardProduct } from '@/components/CardProduct'
import Head from 'next/head'
import { Footer } from '@/components/Footer'

export default function Products() {
  const { query } = useRouter()

  const [listProducts, setListProducts] = useState<ProductInfoProps[]>()

  const param = query.type as 'actionFigure' | 'cafe' | 'copo' | 'all'

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

      <Header buttonCart lengthCart={cart.length} inputSearch isLink />
      <Breadcrumb actualPage={title} />
      <Container>
        {listProducts?.map((product) => (
          <CardProduct
            className="keen-slider__slide"
            key={product.id}
            imgUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            href={`/product?id=${product.id}`}
          />
        ))}
      </Container>
      <Footer />
    </>
  )
}
