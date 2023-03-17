import React from 'react'

import { Container, ActualPage, BreadCrumbLink } from './styles'

interface BreadcrumbProps {
  nameShirt: string
}

export function Breadcrumb({ nameShirt }: BreadcrumbProps) {
  return (
    <Container>
      <BreadCrumbLink href={'/'}>Home</BreadCrumbLink>

      <ActualPage>
        <p>{nameShirt}</p>
      </ActualPage>
    </Container>
  )
}
