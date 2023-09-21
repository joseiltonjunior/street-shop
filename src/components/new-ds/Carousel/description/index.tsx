import Link from 'next/link'
import { motion } from 'framer-motion'

interface DescriptionProps {
  title: string
  description: string
}

export function Description({ title, description }: DescriptionProps) {
  return (
    <div className="flex flex-col gap-2">
      <motion.h1
        className="font-bold text-7xl font-serif md:text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-3xl md:text-base font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 50 }}
        transition={{ duration: 0.7 }}
      >
        <Link
          href={'/'}
          className="bg-purple-600 py-2 px-8 rounded-lg w-fit text-white font-semibold hover:bg-purple-700  "
        >
          SHOP NOW
        </Link>
      </motion.div>
    </div>
  )
}
