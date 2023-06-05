import React, { ButtonHTMLAttributes } from 'react'
import ReactLoading from 'react-loading'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
}

export function Button({ children, isLoading, variant, ...rest }: ButtonProps) {
  return (
    <Container {...rest} theme={variant}>
      {isLoading ? (
        <ReactLoading type="bars" color={'#fff'} width={40} height={40} />
      ) : (
        children
      )}
    </Container>
  )
}
