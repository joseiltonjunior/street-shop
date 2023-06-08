import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'

import { ProductsProps } from '@/types/product'

import Link from 'next/link'
import { useEffect } from 'react'

export function BestSellerCarousel({ products }: ProductsProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    loop: true,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 4000)

    return () => {
      clearInterval(interval)
    }
  }, [instanceRef])

  return (
    <div ref={sliderRef} className="ken-slider flex overflow-hidden">
      {products.map((product) => (
        <Link
          title="Abrir produto"
          key={product.id}
          className="keen-slider__slide bg-indigo-600 rounded"
          href={`/product?id=${product.id}`}
          prefetch={false}
        >
          <div className="overflow-hidden">
            <p className="text-white bg-[#202024] w-fit p-2 truncate">
              {product.name}
            </p>
            <p className="text-white text-lg bg-[#202024] w-fit p-2">
              {product.price}
            </p>
          </div>
          <Image src={product.imageUrl} width={480} height={400} alt="" />
        </Link>
      ))}
    </div>
  )
}
