import Image from 'next/image'
import { Info } from '../styles'
import { Container } from './styles'

import logo from '@/assets/dcoffee-logo.png'

export function Apresetation() {
  return (
    <Container>
      <Image src={logo} alt="" height={40} />
      <Info>
        Este e-commerce é parte de uma seleção de produtos digitais criados de
        forma autoral.
      </Info>
    </Container>
  )
}
