import { PropsWithChildren } from 'react'
import { Container } from './styles'

export function ContentWeb({ children }: PropsWithChildren) {
  return <Container>{children}</Container>
}
