import { Container } from './styles'

import { FieldError, UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes, useState } from 'react'

import { IconType } from 'react-icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  name: string
  icon?: IconType
  label: string
  register: UseFormRegister<any>
}

export function Input({
  label,
  error,
  register,
  icon: Icon,
  name,
  disabled,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Container isError={!!error} isFocused={isFocused} isDisabled={disabled}>
      {Icon && <Icon size={22} />}
      <input
        {...register(name)}
        {...rest}
        placeholder={label}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        disabled={disabled}
      />
    </Container>
  )
}
