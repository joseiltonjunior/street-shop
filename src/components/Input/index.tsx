import { Container } from './styles'

import { FieldError, UseFormRegister } from 'react-hook-form'
import { useState } from 'react'

import { IconType } from 'react-icons'

interface InputProps {
  error?: FieldError
  name: string
  icon: IconType
  label: string

  register: UseFormRegister<any>
}

export function Input({
  label,
  error,
  register,
  icon: Icon,
  name,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Container isError={!!error} isFocused={isFocused}>
      <Icon size={22} />
      <input
        {...register(name)}
        placeholder={label}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
    </Container>
  )
}
