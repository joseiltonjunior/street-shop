import Image from 'next/image'
import Link from 'next/link'

interface ProductForPriceProps {
  text: string
  imgUrl: string
  price: string
}

export function ProductForPrice({ imgUrl, text, price }: ProductForPriceProps) {
  return (
    <Link
      href={`/products?category=${price}`}
      className="bg-gray-800 h-full w-full pt-6 pb-6 rounded flex items-center justify-center relative"
    >
      <Image
        src={imgUrl}
        width={250}
        height={250}
        alt="up to 50"
        className="object-contain transform hover:scale-110 transition duration-300"
      />

      <strong className="absolute top-0 right-0 bg-orange-500 p-2 rounded-bl flex items-center justify-center text-gray-800 text-lg">
        {text}
      </strong>
    </Link>
  )
}
