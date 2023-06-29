import Image from 'next/image'
import Link from 'next/link'

interface ItemCategoryProps {
  title: string
  imgUrl: string
  type: 'actionFigure' | 'coffee' | 'cups'
}

export function ItemCategory({ imgUrl, title, type }: ItemCategoryProps) {
  return (
    <Link
      href={`/products/${type}`}
      className="bg-gray-500 h-full
     w-full rounded overflow-hidden flex flex-col items-center pb-5 justify-center relative cursor-pointer"
    >
      <Image
        src={imgUrl}
        alt=""
        width={250}
        height={250}
        className="object-contain transform hover:scale-110 transition duration-300"
      />

      <strong className="text-orange-500 text-lg">{title}</strong>
    </Link>
  )
}
