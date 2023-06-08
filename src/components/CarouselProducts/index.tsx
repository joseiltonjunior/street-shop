import { ProductsProps } from '@/types/product'

import Link from 'next/link'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { useEffect } from 'react'

export function CarouselProducts({ products }: ProductsProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    loop: true,

    // renderMode: 'performance',
    // rtl: true,
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
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product?id=${product.id}`}
          title="Abrir produto"
          className="keen-slider__slide w-full flex items-center justify-center"
        >
          <Image
            src={product.imageUrl}
            width={200}
            height={200}
            alt="product"
          />
        </Link>
      ))}
    </div>
  )
}
