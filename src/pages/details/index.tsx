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
import { Button } from '@/components/form/Button'
import { formatReal } from '@/utils/formatReal'
import { useRouter } from 'next/router'
import { formatCep } from '@/utils/formatCep'
import { formatPhone } from '@/utils/formatPhone'
import { useDispatch, useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import { ProductInfoProps } from '@/types/product'
import { clearCart } from '@/storage/modules/cart/action'
import { filterProducts } from '@/storage/modules/filter-products/action'
import { Header } from '@/components/layout/Header'

export default function Details({ salesInformation }: DetailsProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const cart = useSelector<reduxProps, ProductInfoProps[]>(
    (state) => state.cart,
  )

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
            {cart.map((item) => (
              <Product key={item.id}>
                <Image src={item.imageUrl} alt="" width={100} height={100} />

                <ProductInfoContent>
                  <NameProduct>{item.name}</NameProduct>
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
                  <p>Dados do Cliente</p>
                  <RowContent>
                    <strong>Nome</strong>
                    <span>{salesInformation.clientName}</span>
                  </RowContent>

                  <RowContent>
                    <strong>E-mail</strong>
                    <span>{salesInformation.clientEmail}</span>
                  </RowContent>

                  <RowContent>
                    <strong>Telefone</strong>
                    <span>
                      {formatPhone(salesInformation.shippingDetails.phone)}
                    </span>
                  </RowContent>

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
                      {formatCep(
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

            <Button
              onClick={() => {
                dispatch(clearCart())
                dispatch(filterProducts(''))
                router.replace('/')
              }}
            >
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

  await stripe.paymentIntents
    .retrieve(sessionId, {})
    .then((result) => {
      const clientName = result.shipping?.name

      salesInformation = {
        id: result.id,
        clientName,
        clientEmail: result.receipt_email,
        shippingDetails: result.shipping,
        amountTotal: formatReal(result.amount!),
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
