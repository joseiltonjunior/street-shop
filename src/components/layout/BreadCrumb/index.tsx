import React, { HTMLAttributes } from 'react'
import Skeleton from 'react-loading-skeleton'

import { RxDotFilled } from 'react-icons/rx'

import { Container, ActualPage } from './styles'

import Link from 'next/link'

interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  actualPage?: string
  isLoading?: boolean
}

export function Breadcrumb({
  actualPage,
  isLoading,
  ...rest
}: BreadcrumbProps) {
  return (
    <Container {...rest} className="md:px-3">
      {isLoading ? (
        <Skeleton width={400} height={25} className="skeleton" />
      ) : (
        <>
          <Link href={'/'} className="text-orange-500 font-bold">
            Voltar
          </Link>
          <RxDotFilled />
          {actualPage && (
            <ActualPage>
              <p>{actualPage}</p>
            </ActualPage>
          )}
        </>
      )}
    </Container>
  )
}
