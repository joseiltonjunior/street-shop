import Link from 'next/link'
import { HiShoppingCart } from 'react-icons/hi'
import { motion } from 'framer-motion'

import { HeaderProps } from '@/types/header'

export function Header({ lengthCart, isTop }: HeaderProps) {
  return (
    <motion.header
      initial={{
        background: isTop ? '#fff' : 'transparent',
        height: isTop ? 70 : 80,
      }}
      animate={{
        background: isTop ? 'transparent' : '#fff',
        height: isTop ? 80 : 70,
      }}
      transition={{ duration: 0.3 }}
      className={`w-full h-[70px] base:fixed z-20 ${
        !isTop && 'shadow'
      } ps-4 pe-8 md:max-h-[70px]`}
    >
      <main className="container flex gap-4 items-center h-full">
        <div className="flex gap-4 items-center">
          <div className="flex gap-1">
            <p className="font-bold text-xl">STREET</p>
            <p className="font-normal text-xl">SHOP</p>
          </div>

          <div className="ms-10 md:hidden">
            <nav className="flex items-center text-sm gap-6 font-medium">
              <Link href={'/'} className="hover:text-purple-600 ">
                Home
              </Link>
              <Link href={'/products'} className="hover:text-purple-600 ">
                Shop
              </Link>
              <Link href={'/features'} className="hover:text-purple-600 ">
                Features
              </Link>
              <Link href={'/blog'} className="hover:text-purple-600 ">
                Blog
              </Link>
              <Link href={'/about'} className="hover:text-purple-600 ">
                About
              </Link>
              <Link href={'/contact'} className="hover:text-purple-600 ">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <Link href="/cart" title="Abrir carrinho" className="ms-auto relative">
          <HiShoppingCart size={26} className="fill-gray-500" />
          <strong className="absolute bg-purple-600 text-gray-100 w-4 h-4 flex items-center justify-center text-xs bottom-4 left-6">
            {lengthCart}
          </strong>
        </Link>
      </main>
    </motion.header>
  )
}
