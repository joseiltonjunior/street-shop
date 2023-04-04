import { stripe } from '@/lib/stripe'

import { SuccessProps } from '@/types/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import caretLeft from '@/assets/caret-left.svg'
import caretRight from '@/assets/caret-right.svg'

import { useKeenSlider } from 'keen-slider/react'
import {
  ButtonNext,
  ButtonPrev,
} from '@/components/BestSellerCarouselMobile/styles'
import { useDispatch } from 'react-redux'
import { clearCart } from '@/storage/modules/cart/action'
import { useRouter } from 'next/router'

import {
  Container,
  ImageContainer,
  ButtonClearCart,
} from '@/styles/pages/success'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'

export default function Success({ salesInformation }: SuccessProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 18,
    },
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const nameClient = salesInformation.clientName.split(' ', 1).toString()
  const nameFormart =
    nameClient[0].toUpperCase() + nameClient.slice(1).toLowerCase()

  return (
    <>
      <Head>
        <title>{`Compra efetuada | D'Coffee Shop`}</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Header />

      <Container>
        <div ref={sliderRef} className="ken-slider">
          {salesInformation.products.map((item, index) => (
            <ImageContainer
              key={item.product.name}
              className="keen-slider__slide"
            >
              {index !== 0 && (
                <ButtonPrev
                  onClick={(e) => {
                    e.preventDefault()
                    instanceRef.current?.prev()
                  }}
                >
                  <Image src={caretLeft} alt="" />
                </ButtonPrev>
              )}
              <Image
                src={item.product.images[0]}
                alt=""
                width={520}
                height={480}
              />

              {index + 1 !== salesInformation.products.length && (
                <ButtonNext
                  onClick={(e) => {
                    e.preventDefault()
                    instanceRef.current?.next()
                  }}
                >
                  <Image src={caretRight} alt="" />
                </ButtonNext>
              )}
            </ImageContainer>
          ))}
        </div>

        <div className="info">
          <h1>Compra efetuada com sucesso</h1>
          <p>
            Uhuul <strong style={{ color: '#FFBA00' }}>{nameFormart}</strong>,
            sua compra já está sendo processada e logo estará a caminho da sua
            casa.
          </p>

          <Button
            onClick={() => {
              dispatch(clearCart())
              router.replace(`/details?id=${salesInformation.id}`)
            }}
          >
            Detalhes da compra
          </Button>

          <ButtonClearCart
            onClick={() => {
              dispatch(clearCart())
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
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  let salesInformation = {} || null

  const sessionId = String(query.session_id)

  await stripe.checkout.sessions
    .retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    })
    .then((result) => {
      const clientName = result.customer_details?.name
      const products = result.line_items?.data.map((item) => {
        return { product: item.price?.product, quantity: item.quantity }
      })

      salesInformation = { clientName, products, id: result.id }
    })
    .catch(() => {
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
