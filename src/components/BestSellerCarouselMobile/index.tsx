import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'

import { ProductsProps } from '@/types/product'
import Link from 'next/link'
import { useEffect } from 'react'

export function BestSellerCarouselMobile({ products }: ProductsProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 18,
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
      className="ken-slider flex overflow-hidden bg-indigo-600 rounded"
    >
      {products.map((product) => (
        <Link
          key={product.id}
          className="keen-slider__slide "
          href={`/product?id=${product.id}`}
          prefetch={false}
        >
          <div>
            <p className="text-white bg-[#202024] w-fit p-2 truncate">
              {product.name}
            </p>
            <p className="text-white text-lg bg-[#202024] w-fit p-2">
              {product.price}
            </p>
          </div>

          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </Link>
      ))}
    </div>
  )
}
