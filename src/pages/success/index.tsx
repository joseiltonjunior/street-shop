import { stripe } from '@/lib/stripe'
import { Container, ImageContainer } from '@/styles/pages/success'
import { SuccessProps } from '@/types/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Success({ salesInformation }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Container>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image
            src={salesInformation.product.images[0]}
            alt=""
            width={120}
            height={110}
          />
        </ImageContainer>

        <p>
          Uhuul <strong>{salesInformation.clientName}</strong>, sua{' '}
          <strong>{salesInformation.product.name}</strong> já está a caminho da
          sua casa.
        </p>

        <Link href={`/`}>Voltar ao catálogo</Link>
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
      const product = result.line_items?.data[0].price?.product
      salesInformation = { clientName, product }
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
