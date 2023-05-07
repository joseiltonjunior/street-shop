import React, { HTMLAttributes } from 'react'
// import { Select } from '../Select'
import Skeleton from 'react-loading-skeleton'

import separator from '@/assets/separator.png'

import { Container, ActualPage, BreadCrumbLink, Separator } from './styles'
import { useRouter } from 'next/router'

interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  actualPage?: string
  // filterProducts?: string
  // setFilterProducts?: (key: string) => void
  isLoading?: boolean
}

export function Breadcrumb({
  actualPage,
  // filterProducts,
  isLoading,
  // setFilterProducts,
  ...rest
}: BreadcrumbProps) {
  const router = useRouter()

  return (
    <Container {...rest}>
      {isLoading ? (
        <Skeleton width={400} height={25} className="skeleton" />
      ) : (
        <>
          <BreadCrumbLink
            onClick={() => {
              router.back()
            }}
          >
            Voltar
          </BreadCrumbLink>
          <Separator src={separator} alt="" width={30} height={30} />
          {actualPage && (
            <ActualPage>
              <p>{actualPage}</p>
            </ActualPage>
          )}
        </>
      )}

      {/* {filterProducts !== null && setFilterProducts && (
        <ActualPage>
          <Select
            onAction={(e) => setFilterProducts(e.value)}
            itens={[
              { name: 'Categoria', value: '' },
              { name: 'Café', value: 'cafe' },
              { name: 'Copos e Garrafas', value: 'copo' },
            ]}
          />
        </ActualPage>
      )} */}
    </Container>
  )
}
