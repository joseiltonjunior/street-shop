import Image from 'next/image'
import { Info, Redirect } from '../styles'

import logo from '@/assets/dcoffee-logo.png'

import { Container } from './styles'

export function Apresetation() {
  return (
    <Container>
      <Image src={logo} alt="" height={40} />
      <Info style={{ marginTop: '1rem' }}>
        E-commerce fictício criado com intuito de desenvolver novas skills e
        popular meu portfólio, o projeto faz parte da trilha React do curso da{' '}
        <Redirect target="_blank" href={'https://www.rocketseat.com.br/'}>
          Rocketseat
        </Redirect>
        .
      </Info>
    </Container>
  )
}
