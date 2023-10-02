import { ProductInfoProps } from '@/types/product'
import Image from 'next/image'
import { ComponentProps, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { motion } from 'framer-motion'

interface ProductCardProps extends ComponentProps<'div'> {
  product: ProductInfoProps
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHover, setIsHover] = useState(false)

  return (
    <motion.div
      initial={{ width: '90%', height: '90%', opacity: 0, y: 20 }}
      animate={{ width: '100%', height: '100%', opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="bg-gray-200 relative flex justify-center h-[334px] overflow-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Image
          src={product.imageUrl}
          alt={`${product.name}`}
          width={300}
          height={300}
          className="object-fill transform hover:scale-110 transition duration-300"
        />

        <motion.button
          animate={{ y: isHover ? 0 : 20, opacity: isHover ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-4 bg-white px-4 py-2 rounded-full hover:bg-gray-950 hover:text-white transition duration-150"
        >
          Quick View
        </motion.button>
      </div>
      <div className="flex justify-between mt-4 items-start">
        <p className="text-sm text-gray-500/60">{product.name}</p>
        <button>
          <AiOutlineHeart className="fill-gray-500/80" />
        </button>
      </div>
      <p className="text-sm text-gray-500/90 mt-2">{product.price}</p>
    </motion.div>
  )
}
