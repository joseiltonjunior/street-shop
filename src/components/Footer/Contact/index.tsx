import Image from 'next/image'

import { Title, Info } from '../styles'
import { Container } from './styles'

interface ContactProps {
  mobile?: boolean
}

export function Contact({ mobile }: ContactProps) {
  return (
    <Container mobile={mobile}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Image
          src={`https://avatars.githubusercontent.com/u/47725788?v=4`}
          alt=""
          width={70}
          height={70}
          style={{ borderRadius: 70 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title>Junior Ferreira</Title>
          <Info>Software Developer</Info>
        </div>
      </div>
    </Container>
  )
}
