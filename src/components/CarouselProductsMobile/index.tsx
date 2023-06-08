import { useTransition, animated, useSpringRef } from '@react-spring/web'

import { ProductsProps } from '@/types/product'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'

export function CarouselProductsMobile({ products }: ProductsProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const transRef = useSpringRef()
  const transitions = useTransition(products[index], {
    key: products[index]?.id,
    ref: transRef,
    trail: 200,
    config: { duration: 300 },
    from: { opacity: 0, transform: `translateX(${100 * direction}%)` },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 1, transform: `translateX(${-100 * direction}%)` },
  })

  function handlePrev() {
    setDirection(-1)
    setIndex((index - 1 + products.length) % products.length)
  }

  function handleNext() {
    setDirection(1)
    setIndex((index + 1) % products.length)
  }

  useEffect(() => {
    transRef.start()
  }, [index, transRef, products])

  return (
    <div className="flex  text-white overflow-hidden rounded">
      {transitions((style, item) => (
        <animated.div style={{ ...style }} className="w-full h-[200px]">
          <Link
            href={`/product?id=${item.id}`}
            title="Abrir produto"
            key={item.id}
          >
            {index !== 0 && (
              <button
                className="absolute bg-indigo-800 z-[999] top-1/2 left-[10px] rounded-full p-2"
                onClick={(e) => {
                  e.preventDefault()
                  handlePrev()
                }}
              >
                <AiOutlineCaretLeft size={20} />
              </button>
            )}

            <div className="flex justify-center items-center">
              <Image
                src={item.imageUrl}
                width={200}
                height={200}
                alt="product"
              />
            </div>

            {index + 1 !== products.length && (
              <button
                className="absolute bg-indigo-800 z-[999] top-1/2 right-[10px] rounded-full p-2"
                onClick={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
              >
                <AiOutlineCaretRight />
              </button>
            )}
          </Link>
        </animated.div>
      ))}
    </div>
  )
}
