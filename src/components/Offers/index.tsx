import { ProductsProps } from '@/types/product'

import Link from 'next/link'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'

export function Offers({ products }: ProductsProps) {
  const [screenWidth, setScreenWidth] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: screenWidth < 900 ? 1 : 3,
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

  useEffect(() => {
    function getScreenWidth() {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      )
    }

    function handleResize() {
      const screenWidth = getScreenWidth()
      setScreenWidth(screenWidth)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={sliderRef}
      className="ken-slider flex overflow-hidden w-full bg-gray-800"
    >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product?id=${product.id}`}
          title="Abrir produto"
          className="keen-slider__slide flex items-center justify-center relative"
        >
          <Image
            src={product.imageUrl}
            width={300}
            height={300}
            alt="product"
          />

          <strong className="absolute text-white bg-red-600 rounded w-fit p-2 flex items-center max-w-[250px] text-center top-8 right-8">
            {product.price}
          </strong>
        </Link>
      ))}
    </div>
  )
}
