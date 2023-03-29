import React, { HTMLAttributes } from 'react'
import { Select } from '../Select'

import { Container, ActualPage, BreadCrumbLink, Separator } from './styles'

interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  actualPage?: string
  filterProducts?: string
  setFilterProducts?: (key: string) => void
}

export function Breadcrumb({
  actualPage,
  filterProducts,
  setFilterProducts,
  ...rest
}: BreadcrumbProps) {
  return (
    <Container {...rest}>
      <BreadCrumbLink href={'/'}>Voltar</BreadCrumbLink>

      <Separator />

      {actualPage && (
        <ActualPage>
          <p>{actualPage}</p>
        </ActualPage>
      )}

      {filterProducts !== null && setFilterProducts && (
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
      )}
    </Container>
  )
}
