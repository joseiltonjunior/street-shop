import { ProductInfoProps } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface GridProductSecondaryProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductInfoProps
  bkgd?: string
}

export function GridProductSecondary({
  product,
  bkgd = '#202024',
}: GridProductSecondaryProps) {
  return (
    <section
      className={`bg-[${bkgd}] w-full h-[500px] flex items-center justify-center relative`}
    >
      <article className="absolute z-[999] top-0 left-0 max-w-[80%]">
        <strong className="text-gray-900 bg-white w-fit p-4 flex items-center">
          {product?.name}
        </strong>
        <strong className="text-gray-900 bg-white w-fit p-4 flex items-center">
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
