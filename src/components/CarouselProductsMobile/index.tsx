import { useTransition, animated, useSpringRef } from '@react-spring/web'

import { Container, Card } from './styles'

import { ProductsProps } from '@/types/product'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ButtonCarousel } from '../ButtonCarousel'
import { DotCorousel } from '../DotCarousel'

export function CarouselProductsMobile({ products }: ProductsProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const transRef = useSpringRef()
  const transitions = useTransition(products[index], {
    key: products[index]?.id,
    ref: transRef,
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
    <>
      <Container>
        {transitions((style, item) => (
          <animated.div style={{ ...style }}>
            <Card
              href={`/product?id=${item.id}`}
              title="Abrir produto"
              key={item.id}
            >
              {index !== 0 && (
                <ButtonCarousel
                  orietation="Left"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePrev()
                  }}
                />
              )}
              <div className="img">
                <Image src={item.imageUrl} width={200} height={200} alt="" />
              </div>
              <div className="info">
                <strong>{item.price}</strong>
                <span>{item.name}</span>
              </div>

              {index + 1 !== products.length && (
                <ButtonCarousel
                  orietation="Right"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNext()
                  }}
                />
              )}
            </Card>
          </animated.div>
        ))}
      </Container>

      {products.length > 1 && (
        <DotCorousel currentSlide={index} products={products} />
      )}
    </>
  )
}
