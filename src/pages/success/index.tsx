import { stripe } from '@/lib/stripe'
import { Container, ImageContainer } from '@/styles/pages/success'
import { SuccessProps } from '@/types/success'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

export default function Success({ clientName, product }: SuccessProps) {
  return (
    <Container>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src={product.image} alt="" width={120} height={110} />
      </ImageContainer>

      <p>
        Uhuul <strong>{clientName}</strong>, sua <strong>{product.name}</strong>{' '}
        já está a caminho da sua casa.
      </p>

      <Link href={`/`}>Voltar ao catálogo</Link>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const clientName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      clientName,
      product: { name: product.name, image: product.images[0] },
    },
  }
}
