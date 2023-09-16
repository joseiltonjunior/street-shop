// import Image from 'next/image'
import Link from 'next/link'
// import { useDispatch, useSelector } from 'react-redux'
import { HiShoppingCart } from 'react-icons/hi'

// import { FaUserCircle } from 'react-icons/fa'

// import { SearchInput } from '../../form/SearchInput'

// import logo from '@/assets/street-shop.png'

// import { setSideMenu } from '@/storage/modules/side-menu/action'
import { HeaderProps } from '@/types/header'
// import { reduxProps } from '@/storage'
// import { Container } from '@/styles/pages/home'

export function Header({ buttonCart, lengthCart, isUser }: HeaderProps) {
  // const dispatch = useDispatch()

  // const token = useSelector<reduxProps, string>((state) => state.token)

  return (
    <header className="bg-transparent w-full h-[70px] border-b border-gray-300/30 fixed z-10">
      <main className="container flex gap-4 items-center h-full">
        {/* <button
          onClick={() => dispatch(setSideMenu({ isVisible: true }))}
          className="hidden md:block"
        >
          <AiOutlineBars size={30} className="fill-gray-800" />
        </button> */}

        <div className="flex gap-4 md:hidden items-center">
          <div className="flex gap-1">
            <p className="font-bold text-xl">STREET</p>
            <p className="font-normal text-xl">SHOP</p>
          </div>

          <div className="ms-10">
            {/* <SearchInput className="w-[500px] md:hidden ml-auto mr-auto" /> */}
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

        {/* {isUser && (
          <div className="flex items-center gap-2 ml-auto md:hidden">
            {token.length > 0 ? (
              <Link className="md:hidden" title="Minha conta" href={'/profile'}>
                <FaUserCircle size={35} className="fill-gray-800" />
              </Link>
            ) : (
              <div className="flex text-sm gap-2 items-center text-gray-900">
                <FaUserCircle size={35} className="fill-gray-800" />
                <div className="flex flex-col">
                  <span>
                    Faça{' '}
                    <Link
                      className="font-medium hover:underline"
                      title="Minha conta"
                      href={'/sign-in'}
                    >
                      LOGIN
                    </Link>{' '}
                    ou
                  </span>
                  <span>
                    crie seu{' '}
                    <Link
                      className="font-medium hover:underline"
                      title="Minha conta"
                      href={'/register'}
                    >
                      CADASTRO
                    </Link>
                  </span>
                </div>
              </div>
            )}
          </div>
        )} */}

        {buttonCart && (
          <Link
            href="/cart"
            title="Abrir carrinho"
            className="ms-auto relative"
          >
            <HiShoppingCart size={26} className="fill-gray-500" />
            <strong className="absolute bg-purple-600 text-gray-100 w-4 h-4 flex items-center justify-center text-xs bottom-4 left-6">
              {lengthCart}
            </strong>
          </Link>
        )}
      </main>
    </header>
  )
}
