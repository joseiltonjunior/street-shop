import { Container } from './styles'

import { FieldError, UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes, useState } from 'react'
import InputMask from 'react-input-mask'

import { IconType } from 'react-icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  name: string
  icon?: IconType
  label: string
  register: UseFormRegister<any>
  mask?: string
}

export function Input({
  label,
  error,
  register,
  icon: Icon,
  name,
  mask,
  disabled,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Container isError={!!error} isFocused={isFocused} isDisabled={disabled}>
      {Icon && <Icon size={22} />}
      {mask ? (
        <InputMask
          {...register(name)}
          mask={mask}
          maskPlaceholder={null}
          placeholder={label}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          {...rest}
        />
      ) : (
        <input
          {...register(name)}
          placeholder={label}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          {...rest}
        />
      )}
    </Container>
  )
}
