import React, { ButtonHTMLAttributes } from 'react'
import ReactLoading from 'react-loading'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
}

export function Button({ children, isLoading, variant, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="bg-orange-500 h-12 flex items-center justify-center rounded-lg font-bold text-lg hover:bg-orange-500/70 text-gray-500 w-full"
    >
      {isLoading ? (
        <ReactLoading type="bars" color={'#fff'} width={40} height={40} />
      ) : (
        children
      )}
    </button>
  )
}
