import { stripe } from '@/lib/stripe'
import { ProductProps } from '@/types/product'
import { GetStaticPaths, GetStaticProps } from 'next'

import { useRouter } from 'next/router'
import Stripe from 'stripe'

import { Container, ContentMobile, ContentWeb } from '@/styles/pages/product'
import { ProductWeb } from '@/components/ProductWeb'
import { SkeletonProductWeb } from '@/components/ProductWeb/Skeleton'
import { ProductMobile } from '@/components/ProductMobile'
import { SkeletonProductMobile } from '@/components/ProductMobile/Skeleton'
import axios from 'axios'
import { useState } from 'react'

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleBuyProduct() {
    setIsLoading(true)

    await axios
      .post('/api/checkout', { priceId: product.defaultPriceId })
      .then((result) => {
        const { checkoutUrl } = result.data
        window.location.href = checkoutUrl
      })
      .catch(() => {
        setIsLoading(false)
        alert('Falha ao redirecionar ao checkout!')
      })
  }

  if (isFallback) {
    return (
      <Container>
        <ContentWeb>
          <SkeletonProductWeb />
        </ContentWeb>

        <ContentMobile>
          <SkeletonProductMobile />
        </ContentMobile>
      </Container>
    )
  }

  return (
    <Container>
      <ContentWeb>
        <ProductWeb
          product={product}
          purchase={handleBuyProduct}
          isLoading={isLoading}
        />
      </ContentWeb>

      <ContentMobile>
        <ProductMobile
          product={product}
          purchase={handleBuyProduct}
          isLoading={isLoading}
        />
      </ContentMobile>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_NU05AWNJg8a0ky' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
