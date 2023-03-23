import React, { HTMLAttributes } from 'react'

import { Container, ActualPage, BreadCrumbLink } from './styles'

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
      <BreadCrumbLink href={'/'}>Home</BreadCrumbLink>

      {actualPage && (
        <ActualPage>
          <p>{actualPage}</p>
        </ActualPage>
      )}

      {filterProducts !== null && setFilterProducts && (
        <ActualPage>
          <select
            name="products"
            value={filterProducts}
            onChange={(e) => setFilterProducts(e.currentTarget.value)}
          >
            <option value="">Categorias</option>
            <option value="cafe">Cafés</option>
            <option value="copo">Copos e Garrafas</option>
          </select>
        </ActualPage>
      )}
    </Container>
  )
}
