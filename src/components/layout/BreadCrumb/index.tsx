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
    <Container {...rest}>
      {isLoading ? (
        <Skeleton width={400} height={25} className="skeleton" />
      ) : (
        <>
          <Link href={'/'} className="text-indigo-600 font-bold">
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
