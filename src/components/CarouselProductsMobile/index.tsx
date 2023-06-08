import { ProductsProps } from '@/types/product'

import Image from 'next/image'
import React, { useEffect } from 'react'

import Link from 'next/link'

import { useKeenSlider } from 'keen-slider/react'

export function CarouselProductsMobile({ products }: ProductsProps) {
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
      ref={sliderRef}
      className="ken-slider flex overflow-hidden w-full bg-[#202024]"
    >
      {products.map((item) => (
        <Link
          href={`/product?id=${item.id}`}
          title="Abrir produto"
          key={item.id}
          className="keen-slider__slide w-full flex items-center justify-center"
        >
          <div className="flex justify-center items-center">
            <Image src={item.imageUrl} width={200} height={200} alt="product" />
          </div>
        </Link>
      ))}
    </div>
  )
}
