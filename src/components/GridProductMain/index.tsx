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
      className="bg-[#7928ca] h-[800px] md:h-full col-span-2 overflow-hidden"
      {...rest}
    >
      <article>
        <strong className="text-gray-900 bg-white w-fit p-4 truncate flex items-center">
          {product.name}
        </strong>
        <span className="text-gray-900 bg-white w-fit p-4 truncate flex items-center">
          {product.price}
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
            width={500}
            height={500}
            className="object-contain transform hover:scale-110 transition duration-300"
          />
        </Link>
      </figure>
    </section>
  )
}
