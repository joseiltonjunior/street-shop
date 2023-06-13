import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart, AiOutlineBars } from 'react-icons/ai'

import { FaUserCircle } from 'react-icons/fa'

import { SearchInput } from '../../form/SearchInput'

import logoCoffeIcon from '@/assets/logo-name.png'

import { setSideMenu } from '@/storage/modules/side-menu/action'
import { HeaderProps } from '@/types/header'
import { reduxProps } from '@/storage'
import { Container } from '@/styles/pages/home'

export function Header({ buttonCart, lengthCart, isUser }: HeaderProps) {
  const dispatch = useDispatch()

  const token = useSelector<reduxProps, string>((state) => state.token)

  return (
    <header className="bg-[#FFBA00] w-full ">
      <Container>
        <main className="flex gap-4 items-center pt-6 md:p-6 pb-6 ml-auto mr-auto">
          <button
            onClick={() => dispatch(setSideMenu({ isVisible: true }))}
            className="hidden md:block"
          >
            <AiOutlineBars size={30} className="fill-gray-800" />
          </button>

          <div className="flex items-center gap-8 md:hidden">
            <Link href={'/'} title="Ir para a página inicial">
              <Image src={logoCoffeIcon} alt="logo" width={120} height={120} />
            </Link>

            <SearchInput className="w-[500px] md:hidden ml-auto mr-auto" />
          </div>

          {isUser && (
            <div className="flex items-center gap-2 ml-auto md:hidden">
              {token.length < 0 ? (
                <Link
                  className="md:hidden"
                  title="Minha conta"
                  href={'/sign-in'}
                >
                  <FaUserCircle size={35} className="fill-gray-800" />
                </Link>
              ) : (
                <div className="flex text-sm gap-2 items-center">
                  <FaUserCircle size={35} className="fill-gray-800" />
                  <div className="flex flex-col">
                    <span>
                      Faça{' '}
                      <Link
                        className="font-medium"
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
                        className="font-medium"
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
          )}

          {buttonCart && (
            <Link
              href="/cart"
              title="Abrir carrinho"
              className="relative md:ml-auto"
            >
              <AiOutlineShoppingCart size={35} className="fill-gray-800" />
              <span className="absolute bg-gray-800 text-gray-100 rounded-full w-4 h-4 flex items-center justify-center text-[12px] bottom-0  left-6">
                {lengthCart}
              </span>
            </Link>
          )}
        </main>
      </Container>
      <div className="bg-gray-800 w-full">
        <Container>
          <nav className="flex items-center text-white font-bold ">
            <Link
              href={'/products/actionFigure'}
              className="hover:bg-orange-500 hover:text-gray-800 p-1 pl-2 pr-2"
            >
              Action Figures
            </Link>
            <Link
              href={'/products/cafe'}
              className="hover:bg-orange-500 hover:text-gray-800 p-1 pl-2 pr-2"
            >
              Cafés
            </Link>
            <Link
              href={'/products/copo'}
              className="hover:bg-orange-500 hover:text-gray-800 p-1 pl-2 pr-2"
            >
              Copos
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  )
}
