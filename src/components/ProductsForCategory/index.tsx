// import product from '@/storage/modules/cart/reducer'
import { ProductsProps } from '@/types/product'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ProductForCategoryProps extends ProductsProps {
  title: string
}

export function ProductForCategory({
  products,
  title,
}: ProductForCategoryProps) {
  const [screenWidth, setScreenWidth] = useState(0)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: screenWidth < 900 ? 1 : 4,
      spacing: 16,
    },
    loop: true,
  })

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
    <div className="w-full ">
      <h1 className="text-lg text-center font-bold">
        {String(title).toLocaleUpperCase()}
      </h1>
      <div ref={sliderRef} className="flex overflow-hidden">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products?category=${product.id}`}
            className="keen-slider__slide flex-col bg-gray-800 w-full rounded flex items-center justify-center"
          >
            <Image
              src={product.imageUrl}
              width={250}
              height={250}
              alt="up to 50"
              className="object-contain transform hover:scale-110 transition duration-300"
            />

            <div className="bg-gray-800 p-4 flex flex-col  justify-center  border-t border-gray-600 text-sm w-full h-full">
              <p className="text-orange-500 font-bold">{product.price}</p>
              <p className="text-gray-100">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
