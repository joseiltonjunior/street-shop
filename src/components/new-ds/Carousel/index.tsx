import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'
import { Description } from './description'
import { mockCarousel } from '../../../utils/mock'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

export function Carousel() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 1,
    },
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
      className="bg-gray-200 w-full h-screen md:h-[calc(100vh-70px)] flex overflow-hidden relative"
    >
      <button
        className="absolute top-1/2 left-16 z-10 md:hidden"
        onClick={() => instanceRef.current?.prev()}
      >
        <AiFillCaretLeft
          size={30}
          className="fill-gray-400 hover:fill-gray-500"
        />
      </button>
      {mockCarousel.map((item, index) => (
        <div key={index} className="keen-slider__slide relative">
          {activeSlide === index && (
            <div className="h-full flex md:ps-4 base:items-center justify-center md:flex-col gap-36">
              <div className="z-10">
                <Description
                  title={item.title}
                  description={item.description}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="md:absolute h-screen base:h-[calc(100vh-150px)] md:w-full md:left-40 "
              >
                <Image
                  src={item.img}
                  alt="outfit background"
                  width={720}
                  height={1280}
                  className="object-fill w-full h-full "
                />
              </motion.div>
            </div>
          )}
        </div>
      ))}
      <button
        className="absolute top-1/2 right-16 z-10 md:hidden"
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
