import Link from 'next/link'
import { HiShoppingCart } from 'react-icons/hi'
import { motion } from 'framer-motion'

import { HeaderProps } from '@/types/header'
import { useDispatch, useSelector } from 'react-redux'
import { filterCategoryProducts } from '@/storage/modules/filterCategoryProducts/action'
import { MdClose, MdMenu } from 'react-icons/md'
import { reduxProps } from '@/storage'
import { sideMenuProps } from '@/types/sideMenu'
import { setSideMenu } from '@/storage/modules/sideMenu/action'

export function Header({ lengthCart, isTop }: HeaderProps) {
  const dispatch = useDispatch()

  const { isVisible } = useSelector<reduxProps, sideMenuProps>(
    (state) => state.sideMenu,
  )

  return (
    <>
      <motion.header
        initial={{
          background: isTop ? '#fff' : 'rgba(255, 255, 255, 0)',
          height: isTop ? 70 : 80,
        }}
        animate={{
          background: isTop ? 'rgba(255, 255, 255, 0)' : '#fff',
          height: isTop ? 80 : 70,
        }}
        transition={{ duration: 0.3 }}
        className={`w-full h-[70px] base:fixed z-20 ${
          !isTop && 'shadow'
        } md:max-h-[70px]`}
      >
        <main className="container flex gap-4 items-center h-full">
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <p className="font-bold text-xl">STREET</p>
              <p className="font-normal text-xl">SHOP</p>
            </div>

            <div className="ms-10 md:hidden">
              <nav className="flex items-center text-sm gap-6 font-medium">
                <Link
                  href={'/'}
                  className="hover:text-purple-600"
                  onClick={() =>
                    dispatch(filterCategoryProducts({ filter: 'all' }))
                  }
                >
                  Home
                </Link>
                <Link href={'/products'} className="hover:text-purple-600 ">
                  Shop
                </Link>
                <Link href={'/'} className="hover:text-purple-600 ">
                  Features
                </Link>
                <Link href={'/'} className="hover:text-purple-600 ">
                  Blog
                </Link>
                <Link href={'/'} className="hover:text-purple-600 ">
                  About
                </Link>
                <Link href={'/'} className="hover:text-purple-600 ">
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-8 ms-auto">
            <Link href="/" title="Abrir carrinho" className="relative">
              <HiShoppingCart size={26} className="fill-gray-500" />
              <strong className="absolute bg-purple-600 text-gray-100 w-4 h-4 flex items-center justify-center text-xs bottom-4 left-6">
                {lengthCart}
              </strong>
            </Link>

            <button
              className="base:hidden"
              onClick={() => dispatch(setSideMenu({ isVisible: !isVisible }))}
            >
              {isVisible ? <MdClose size={30} /> : <MdMenu size={30} />}
            </button>
          </div>
        </main>
      </motion.header>

      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: isVisible ? 'auto' : 0,
        }}
        transition={{ duration: 0.5 }}
        className="bg-purple-600 w-full text-white base:hidden"
      >
        <nav className="flex flex-col items-start text-sm font-medium py-2">
          <Link
            className="w-full h-full px-4 py-2"
            href={'/'}
            onClick={() => {
              dispatch(filterCategoryProducts({ filter: 'all' }))
              dispatch(setSideMenu({ isVisible: !isVisible }))
            }}
          >
            Home
          </Link>
          <Link
            className="w-full h-full px-4 py-2"
            href={'/products'}
            onClick={() => dispatch(setSideMenu({ isVisible: !isVisible }))}
          >
            Shop
          </Link>
          <Link
            className="w-full h-full px-4 py-2"
            href={'/'}
            onClick={() => dispatch(setSideMenu({ isVisible: !isVisible }))}
          >
            Features
          </Link>
          <Link
            className="w-full h-full px-4 py-2"
            href={'/'}
            onClick={() => dispatch(setSideMenu({ isVisible: !isVisible }))}
          >
            Blog
          </Link>
          <Link
            className="w-full h-full px-4 py-2"
            href={'/'}
            onClick={() => dispatch(setSideMenu({ isVisible: !isVisible }))}
          >
            About
          </Link>
          <Link
            className="w-full h-full px-4 py-2"
            href={'/'}
            onClick={() => dispatch(setSideMenu({ isVisible: !isVisible }))}
          >
            Contact
          </Link>
        </nav>
      </motion.div>
    </>
  )
}
