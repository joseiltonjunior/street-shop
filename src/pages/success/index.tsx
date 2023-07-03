import { stripe } from '@/lib/stripe'

import { SuccessProps } from '@/types/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

import { useKeenSlider } from 'keen-slider/react'

import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '@/storage/modules/cart/action'
import { useRouter } from 'next/router'

import {
  Container,
  ImageContainer,
  ButtonClearCart,
} from '@/styles/pages/success'
import { Button } from '@/components/form/Button'
import { Header } from '@/components/layout/Header'

import { filterProducts } from '@/storage/modules/filter-products/action'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'

export default function Success({ salesInformation }: SuccessProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 18,
    },
  })

  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

  const dispatch = useDispatch()
  const router = useRouter()

  const nameClient = salesInformation.clientName.split(' ', 1).toString()
  const nameformat =
    nameClient[0].toUpperCase() + nameClient.slice(1).toLowerCase()

  return (
    <>
      <Head>
        <title>{`Compra efetuada | D'Coffee Shop`}</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Header noMenu />

      <Container>
        <div ref={sliderRef} className="ken-slider">
          {cart.map((item, index) => (
            <ImageContainer key={item.name} className="keen-slider__slide">
              {index !== 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    instanceRef.current?.prev()
                  }}
                >
                  <AiFillCaretLeft />
                </button>
              )}
              <Image src={item.imageUrl} alt="" width={520} height={480} />

              {index + 1 !== cart.length && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    instanceRef.current?.next()
                  }}
                >
                  <AiFillCaretRight />
                </button>
              )}
            </ImageContainer>
          ))}
        </div>

        <div className="info">
          <h1>Compra efetuada com sucesso</h1>
          <p>
            Uhuul <strong style={{ color: '#FFBA00' }}>{nameformat}</strong>,
            sua compra já está sendo processada e logo estará a caminho da sua
            casa.
          </p>

          <Button
            onClick={() => {
              router.replace(`/details?id=${salesInformation.id}`)
            }}
          >
            Detalhes da compra
          </Button>

          <ButtonClearCart
            onClick={() => {
              dispatch(clearCart())
              dispatch(filterProducts(''))
              router.replace('/')
            }}
          >
            Voltar a página inicial
          </ButtonClearCart>
        </div>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.pi) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  let salesInformation = {} || null

  const paymentIntentId = String(query.pi)

  await stripe.paymentIntents
    .retrieve(paymentIntentId, {})
    .then((result) => {
      const clientName = result.shipping?.name
      const amount = result.amount

      salesInformation = { clientName, amount, id: result.id }
    })
    .catch((e) => {
      salesInformation = null
    })

  if (!salesInformation) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      salesInformation,
    },
  }
}
