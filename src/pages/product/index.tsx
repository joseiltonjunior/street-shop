import { stripe } from '@/lib/stripe'
import { ProductProps, ProductInfoProps } from '@/types/product'
import { GetServerSideProps } from 'next'

import Stripe from 'stripe'

import {
  Container,
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from '@/styles/pages/product'

import { SkeletonProduct } from '@/components/SkeletonProduct'

import Head from 'next/head'
import { Breadcrumb } from '@/components/BreadCrumb'
import { Header } from '@/components/Header'

import { useDispatch, useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import {
  addProduct,
  changeQuantity,
  removeProduct,
} from '@/storage/modules/cart/action'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { ChangeQuantity } from '@/components/ChangeQuantity'
import { Button } from '@/components/Button'
import { CarouselProducts } from '@/components/CarouselProducts'
import { CarouselProductsMobile } from '@/components/CarouselProductsMobile'
import { ContentWeb } from '@/components/ContentWeb'
import { ContentMobile } from '@/components/ContentMobile'
import { formatValue } from '@/utils/formatValue'
import { Footer } from '@/components/Footer'

export default function Product({ product }: ProductProps) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [verifyProductAddCart, setVerifyProductAddCart] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [someProducts, setSomeProducts] = useState<ProductInfoProps[]>()

  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const products = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.products,
  )

  const verifyProductCart = useCallback(() => {
    const productToCart = cart.find((item) => item.id === product.id)

    if (productToCart) {
      setQuantity(productToCart.quantity)
      setVerifyProductAddCart(true)
      return
    }

    setVerifyProductAddCart(false)
  }, [cart, product.id])

  function handleProductCart() {
    if (verifyProductAddCart) {
      router.push('/')
      return
    }

    setVerifyProductAddCart(true)
    dispatch(addProduct({ ...product, quantity }))
  }

  function handleQuantity(param: 'add' | 'sub') {
    if (param === 'add' && quantity < 10) {
      setQuantity(quantity + 1)
      dispatch(changeQuantity({ ...product, quantity: quantity + 1 }))
    } else if (param === 'sub' && quantity > 1) {
      setQuantity(quantity - 1)
      dispatch(changeQuantity({ ...product, quantity: quantity - 1 }))
    } else if (param === 'sub' && quantity === 1) {
      dispatch(removeProduct(product))
      setVerifyProductAddCart(false)
      setQuantity(1)
    }
  }

  useEffect(() => {
    const someProductsList = products.filter(
      (item) => item.unitLabel === product.unitLabel && item.id !== product.id,
    )

    setSomeProducts(someProductsList)
  }, [product.id, product.unitLabel, products])

  useEffect(() => {
    verifyProductCart()
  }, [verifyProductCart])

  if (!product) {
    return (
      <Container>
        <SkeletonProduct />
      </Container>
    )
  }

  return (
    <>
      <Head>
        <meta name="image" content={product.imageUrl} />
        <title>{`${product.name}  | D'Coffee Shop`}</title>
      </Head>

      <Header buttonCart lengthCart={cart.length} isLink inputSearch />

      <Breadcrumb actualPage={product.name} />

      <Container>
        <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </ImageContainer>
          <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>

            <p style={{ marginBottom: '1rem' }}>{product.description}</p>

            {verifyProductAddCart && (
              <ChangeQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
              />
            )}

            <div className="button">
              <Button onClick={handleProductCart}>
                {verifyProductAddCart
                  ? 'Adicionar novos produtos'
                  : 'Adicionar ao carrinho'}
              </Button>
            </div>
          </ProductDetails>
        </ProductContainer>

        {someProducts && (
          <div style={{ marginTop: '4rem' }}>
            <h3>Produtos similares</h3>
            <ContentWeb>
              <CarouselProducts products={someProducts} />
            </ContentWeb>
            <ContentMobile>
              <CarouselProductsMobile products={someProducts} />
            </ContentMobile>
          </div>
        )}
      </Container>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const productId = String(query.id)

  let product = {} || null

  await stripe.products
    .retrieve(productId, {
      expand: ['default_price'],
    })
    .then((result) => {
      const price = result.default_price as Stripe.Price

      product = {
        id: result.id,
        name: result.name,
        imageUrl: result.images[0],
        price: formatValue(price.unit_amount!),
        description: result.description,
        defaultPriceId: price.id,
        unitLabel: result.unit_label,
      }
    })
    .catch(() => {
      product = null
    })

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
  }
}
