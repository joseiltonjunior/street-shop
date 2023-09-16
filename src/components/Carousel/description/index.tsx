import Link from 'next/link'
import { motion } from 'framer-motion'

interface DescriptionProps {
  title: string
  description: string
}

export function Description({ title, description }: DescriptionProps) {
  return (
    <div className="flex flex-col gap-6">
      <motion.h1
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.7 }}
        className="font-bold text-7xl font-serif"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 0.7 }}
      >
        <Link
          href={'/products'}
          className="bg-purple-600 py-2 px-8 rounded-lg w-fit text-white font-semibold hover:bg-purple-700  "
        >
          SHOP NOW
        </Link>
      </motion.div>
    </div>
  )
}
