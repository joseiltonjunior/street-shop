import Image from 'next/image'
import { MouseEventHandler, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface CategoryCardProps {
  title: string
  description: string
  imgUrl?: string
  urlDirection: string
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

export function CategoryCard({
  description,
  imgUrl,
  title,
  urlDirection,
  onClick,
}: CategoryCardProps) {
  const [isHover, setIsHover] = useState(false)

  return (
    <Link
      href={urlDirection}
      className="flex border relative cursor-pointer h-60 justify-around"
      onMouseEnter={() => setIsHover(!isHover)}
      onMouseLeave={() => setIsHover(!isHover)}
      onClick={onClick}
    >
      {isHover && <div className="absolute bg-purple-500/70 w-full h-full" />}
      <div className="py-8 flex flex-col z-10">
        <h1 className={`font-bold text-3xl ${isHover && 'text-white'}`}>
          {title}
        </h1>
        <p
          className={`text-sm  mt-2 ${
            isHover ? 'text-white' : 'text-gray-500/80'
          }`}
        >
          {description}
        </p>
        {isHover && (
          <div className="w-fit mt-auto">
            <motion.p
              className={`font-semibold text-white`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              SHOP NOW
            </motion.p>
            <motion.div
              initial={{ background: '#fff', width: 0, height: 2 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.7 }}
            />
          </div>
        )}
      </div>
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={`Category ${title}`}
          width={150}
          height={150}
          className="object-fill"
        />
      )}
    </Link>
  )
}
