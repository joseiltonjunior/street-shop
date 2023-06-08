import { ProductInfoProps } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface GridProductSecondaryProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductInfoProps
}

export function GridProductSecondary({
  product,
  ...rest
}: GridProductSecondaryProps) {
  return (
    <section className="bg-[#79ca28] w-full h-full" {...rest}>
      <article className="absolute z-[999]">
        <strong className="text-gray-900 bg-white w-fit p-4 flex items-center">
          {product?.name}
        </strong>
        <span className="text-gray-900 bg-white w-fit p-4 flex items-center">
          {product?.price}
        </span>
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
