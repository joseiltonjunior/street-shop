import Image from 'next/image'

interface ItemCategoryProps {
  title: string
  imgUrl: string
}

export function ItemCategory({ imgUrl, title }: ItemCategoryProps) {
  return (
    <div
      className="bg-[#202024] h-full
     w-full rounded flex flex-col items-center pt-6 pb-6 justify-center relative"
    >
      <Image
        src={imgUrl}
        alt=""
        width={250}
        height={250}
        className="object-contain transform hover:scale-110 transition duration-300"
      />
      <div className="z-[999] bg-orange-500 mt-auto text-center rounded-br p-3 absolute top-0 left-0 text-lg">
        <strong>{title}</strong>
      </div>
    </div>
  )
}
