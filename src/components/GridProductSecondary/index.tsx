import { ProductInfoProps } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface GridProductSecondaryProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductInfoProps
  dark?: boolean
}

export function GridProductSecondary({
  product,
  dark,
}: GridProductSecondaryProps) {
  return (
    <section
      className={`bg-gray-500 w-full h-[400px] flex items-center justify-center relative`}
    >
      <article className="absolute z-[999] top-0 left-0 max-w-[80%]">
        <strong className="text-gray-500 bg-orange-500 w-fit p-4 flex items-center rounded-br">
          {product?.name}
        </strong>
        <strong className="text-gray-500 bg-orange-500 w-fit p-4 flex items-center rounded-br">
          {product?.price}
        </strong>
      </article>
      <figure>
        <Link
          href={`/product?id=${product.id}`}
          className="flex justify-center w-full h-full"
        >
          <Image
            src={product.imageUrl}
            alt="product"
            width={400}
            height={400}
            className="object-contain transform hover:scale-110 transition duration-300"
          />
        </Link>
      </figure>
    </section>
  )
}
