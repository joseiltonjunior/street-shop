import { stripe } from '@/lib/stripe'
import { Header } from '@/styles/pages/app'
import { Container, ImageContainer } from '@/styles/pages/success'
import { SuccessProps } from '@/types/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import logoCoffeIcon from '@/assets/dcoffee-logo.png'

export default function Success({ salesInformation }: SuccessProps) {
  return (
    <>
      <Head>
        <meta name="image" content={salesInformation.product.images[0]} />

        <title>{`Compra efetuada | D'Coffee Shop`}</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Header>
        <Image src={logoCoffeIcon} alt="" width={150} />
      </Header>

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
