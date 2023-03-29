import { PropsWithChildren } from 'react'
import { Container } from './styles'

export function ContentMobile({ children }: PropsWithChildren) {
  return <Container>{children}</Container>
}
