import { ProductInfoProps } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface GridProductSecondaryProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductInfoProps
}

export function GridProductMain({
  product,
  ...rest
}: GridProductSecondaryProps) {
  return (
    <section
      className="bg-[#FFBA00] h-[800px] col-span-2 overflow-hidden items-center justify-center flex relative"
      {...rest}
    >
      <article className="absolute top-0 left-0 z-[999] w-10/12">
        <strong className="text-gray-900 bg-white w-fit p-4 flex items-center">
          {product.name}
        </strong>
        <strong className="text-gray-900 bg-white w-fit p-4 flex items-center">
          {product.price}
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
            width={500}
            height={500}
            className="object-contain transform hover:scale-110 transition duration-300"
          />
        </Link>
      </figure>
    </section>
  )
}
