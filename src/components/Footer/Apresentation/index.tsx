import Image from 'next/image'
import { Info } from '../styles'

import logo from '@/assets/dcoffee-logo.png'

export function Apresetation() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxWidth: '300px',
      }}
    >
      <Image src={logo} alt="" height={40} />
      <Info>
        Este e-commerce é parte de uma seleção de produtos digitais criados de
        forma autoral.
      </Info>
    </div>
  )
}
