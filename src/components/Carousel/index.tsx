import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'
import { Description } from './description'
import { mockCarousel } from './mock'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

export function Carousel() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 16,
    },
    mode: 'snap',
  })
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (instanceRef) {
      instanceRef.current?.on('slideChanged', (slide) => {
        setActiveSlide(slide.track.details.abs)
      })
    }
  }, [instanceRef])

  useEffect(() => {
    const interval = setInterval(() => {
      switch (activeSlide) {
        case 0:
          instanceRef.current?.next()
          break

        case 1:
          instanceRef.current?.next()
          break
        case 2:
          instanceRef.current?.moveToIdx(0)
          break

        default:
          break
      }
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [activeSlide, instanceRef])

  return (
    <div
      ref={sliderRef}
      className="bg-gray-100 w-full h-screen flex overflow-hidden relative"
    >
      <button
        className="absolute top-1/2 left-32 z-10"
        onClick={() => instanceRef.current?.prev()}
      >
        <AiFillCaretLeft
          size={30}
          className="fill-gray-400 hover:fill-gray-500"
        />
      </button>
      {mockCarousel.map((item, index) => (
        <div
          key={index}
          className="keen-slider__slide h-full items-center justify-center flex gap-36"
        >
          {activeSlide === index && (
            <>
              <Description title={item.title} description={item.description} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src={item.img}
                  alt="outfit"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </motion.div>
            </>
          )}
        </div>
      ))}
      <button
        className="absolute top-1/2 right-32 z-10"
        onClick={() => instanceRef.current?.next()}
      >
        <AiFillCaretRight
          size={30}
          className="fill-gray-400 hover:fill-gray-500"
        />
      </button>
    </div>
  )
}
