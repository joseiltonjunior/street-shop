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
      className="bg-gray-500 h-full w-full  rounded overflow-hidden flex flex-col items-center justify-center relative pb-5"
    >
      <Image
        src={imgUrl}
        width={250}
        height={250}
        alt="up to 50"
        className="object-contain transform hover:scale-110 transition duration-300"
      />

      <strong className="text-orange-500 text-lg">{text}</strong>
    </Link>
  )
}
