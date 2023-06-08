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
      className="bg-indigo-800 p-4 rounded font-bold text-lg hover:bg-indigo-600"
    >
      {isLoading ? (
        <ReactLoading type="bars" color={'#fff'} width={40} height={40} />
      ) : (
        children
      )}
    </button>
  )
}
