import { ComponentProps } from 'react'
import { MdSearch } from 'react-icons/md'
import { motion } from 'framer-motion'

interface InputWithFilterProps extends ComponentProps<'input'> {
  isVisible: boolean
}

export function Input({ isVisible, ...rest }: InputWithFilterProps) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height: isVisible ? 'auto' : 0,
      }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <div className="flex items-center relative">
        <MdSearch
          size={20}
          className="fill-gray-400 hover:fill-purple-600 transition delay-150 left-4 absolute"
        />

        <input
          type="text"
          className="h-full w-full ps-12 py-4 border outline-none focus:border-purple-600 cursor-pointer"
          {...rest}
        />
      </div>
    </motion.div>
  )
}
