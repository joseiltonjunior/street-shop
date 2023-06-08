import Image from 'next/image'

import { AnchorHTMLAttributes } from 'react'

import Link from 'next/link'

interface CardProductProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string
  price: string
  imgUrl: string
}

export function CardProduct({
  imgUrl,
  name,
  price,
  href = '/',
  ...rest
}: CardProductProps) {
  return (
    <Link
      {...rest}
      href={href}
      title="Abrir produto"
      className="bg-[#202024] rounded w-full flex flex-col items-center overflow-hidden"
    >
      <Image src={imgUrl} width={200} height={200} alt="" />

      <div className="p-2 flex flex-col items-center justify-center h-full text-center border-t border-indigo-800 w-full">
        <strong>{price}</strong>
        <span>{name}</span>
      </div>
    </Link>
  )
}
