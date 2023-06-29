import { ProductsProps } from '@/types/product'

import Link from 'next/link'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

export function Offers({ products }: ProductsProps) {
  const [isVisibleButton, setIsVisibleButton] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 48,
    },
    loop: true,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [instanceRef])

  return (
    <div
      onMouseEnter={() => setIsVisibleButton(true)}
      onMouseLeave={() => setIsVisibleButton(false)}
      ref={sliderRef}
      className="ken-slider flex overflow-hidden w-full bg-gray-500 items-center rounded relative"
    >
      {isVisibleButton && (
        <button
          className="bg-orange-500 py-6 px-2 rounded-r-full absolute z-50"
          onClick={() => instanceRef.current?.prev()}
        >
          <AiFillCaretLeft size={20} className="fill-gray-500" />
        </button>
      )}
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product?id=${product.id}`}
          title="Abrir produto"
          className="keen-slider__slide flex items-center justify-center relative p-2"
        >
          <Image
            src={product.imageUrl}
            width={300}
            height={300}
            alt="product"
            className="object-contain transform hover:scale-110 transition duration-300 md:h-52 md:w-52"
          />

          <div className="flex flex-col items-center">
            <strong className="text-white rounded w-fit p-2 flex items-center text-center top-8 right-8 text-xl md:text-base">
              {product.name}
            </strong>

            <strong className="text-orange-500 text-xl md:text-base">
              {product.price}
            </strong>
          </div>
        </Link>
      ))}
      {isVisibleButton && (
        <button
          className="bg-orange-500 py-6 px-2 rounded-l-full absolute right-0"
          onClick={() => instanceRef.current?.next()}
        >
          <AiFillCaretRight size={20} className="fill-gray-500" />
        </button>
      )}
    </div>
  )
}
