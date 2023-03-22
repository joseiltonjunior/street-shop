import { stripe } from '@/lib/stripe'
import { Header } from '@/styles/pages/app'
import { Container, ImageContainer } from '@/styles/pages/success'
import { SuccessProps } from '@/types/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import logoCoffeIcon from '@/assets/dcoffee-logo.png'

import caretLeft from '@/assets/caret-left.svg'
import caretRight from '@/assets/caret-right.svg'

import { useKeenSlider } from 'keen-slider/react'
import { ButtonNext, ButtonPrev } from '@/components/HomeMobile/styles'

export default function Success({ salesInformation }: SuccessProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 18,
    },
  })

  return (
    <>
      <Head>
        {/* <meta name="image" content={salesInformation.product.images[0]} /> */}

        <title>{`Compra efetuada | D'Coffee Shop`}</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Header>
        <Image src={logoCoffeIcon} alt="" width={150} />
      </Header>

      <Container>
        <h1>Detalhes da compra</h1>
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
                width={250}
                height={250}
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

        <p>
          Uhuul{' '}
          <strong style={{ color: '#FFBA00' }}>
            {salesInformation.clientName}
          </strong>
          , sua compra já está sendo processada e logo estará a caminho da sua
          casa.
        </p>

        <Link href={`/`}>Voltar a Home</Link>
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

      salesInformation = { clientName, products }
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
