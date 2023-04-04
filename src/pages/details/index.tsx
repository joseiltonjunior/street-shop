import { Header } from '@/components/Header'
import { stripe } from '@/lib/stripe'
import { DetailsProps } from '@/types/details'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import {
  Container,
  ProductsContent,
  Product,
  ProductInfoContent,
  TotalContent,
  RowContent,
  NameProduct,
} from '@/styles/pages/details'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { formartValue } from '@/utils/formartValue'
import { useRouter } from 'next/router'
import { formartCep } from '@/utils/formartCep'

export default function Details({ salesInformation }: DetailsProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{`Compra efetuada | D'Coffee Shop`}</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Header />

      <Container>
        <h1>Detalhes da compra</h1>
        <div className="content">
          <ProductsContent>
            {salesInformation.products.map((item) => (
              <Product key={item.product.id}>
                <Image
                  src={item.product.images[0]}
                  alt=""
                  width={100}
                  height={100}
                />

                <ProductInfoContent>
                  <NameProduct>{item.product.name}</NameProduct>
                  <RowContent>
                    <span>Qtde: {item.quantity}</span>
                    <strong>{item.price}</strong>
                  </RowContent>
                </ProductInfoContent>
              </Product>
            ))}
          </ProductsContent>

          <TotalContent>
            <div>
              {salesInformation.shippingDetails?.address && (
                <div className="topContent">
                  <p>Endereço para entrega</p>

                  <RowContent>
                    <strong>Rua</strong>
                    <span>
                      {salesInformation.shippingDetails.address.line1},{' '}
                      {salesInformation.shippingDetails.address.line2}
                    </span>
                  </RowContent>
                  <RowContent>
                    <strong>Cidade</strong>
                    <span>
                      {salesInformation.shippingDetails.address.city}/
                      {salesInformation.shippingDetails.address.state}
                    </span>
                  </RowContent>
                  <RowContent>
                    <strong>CEP</strong>
                    <span>
                      {formartCep(
                        salesInformation.shippingDetails.address.postal_code,
                      )}
                    </span>
                  </RowContent>
                </div>
              )}

              <div className="bottomContent">
                <RowContent>
                  <p>Total</p>
                  <span>{salesInformation.amountTotal}</span>
                </RowContent>
              </div>
            </div>

            <Button onClick={() => router.replace('/')}>
              Ir para página principal
            </Button>
          </TotalContent>
        </div>
      </Container>
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

  let salesInformation = {} || null

  const sessionId = String(query.id)

  await stripe.checkout.sessions
    .retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    })
    .then((result) => {
      const clientName = result.customer_details?.name
      const products = result.line_items?.data.map((item) => {
        return {
          product: item.price?.product,
          quantity: item.quantity,
          price: formartValue(item.amount_total),
        }
      })

      salesInformation = {
        clientName,
        products,
        shippingDetails: result.shipping_details,
        amountTotal: formartValue(result.amount_total!),
      }
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
