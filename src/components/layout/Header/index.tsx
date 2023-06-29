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
    <header className="bg-orange-500 w-full">
      <Container>
        <main className="flex gap-4 items-center md:p-4 ml-auto mr-auto">
          <button
            onClick={() => dispatch(setSideMenu({ isVisible: true }))}
            className="hidden md:block"
          >
            <AiOutlineBars size={30} className="fill-gray-800" />
          </button>

          <div className="flex gap-4 md:hidden items-center">
            <Link href={'/'} title="Ir para a página inicial">
              <Image src={logoCoffeIcon} alt="logo" width={140} height={140} />
            </Link>

            <div className="mt-1">
              <SearchInput className="w-[500px] md:hidden ml-auto mr-auto" />
              <nav className="flex items-center text-gray-800 font-bold ">
                <Link
                  href={'/products/actionFigure'}
                  className="hover:text-white pl-2 pr-2"
                >
                  Action Figures
                </Link>
                <Link
                  href={'/products/coffee'}
                  className="hover:text-white pl-2 pr-2"
                >
                  Cafés
                </Link>
                <Link
                  href={'/products/cups'}
                  className="hover:text-white pl-2 pr-2"
                >
                  Copos
                </Link>
              </nav>
            </div>
          </div>

          {isUser && (
            <div className="flex items-center gap-2 ml-auto md:hidden">
              {token.length > 0 ? (
                <Link
                  className="md:hidden"
                  title="Minha conta"
                  href={'/profile'}
                >
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
          )}

          {buttonCart && (
            <Link
              href="/cart"
              title="Abrir carrinho"
              className="relative md:ml-auto"
            >
              <AiOutlineShoppingCart size={35} className="fill-gray-800" />
              <strong className="absolute bg-gray-500 text-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs bottom-0 left-6">
                {lengthCart}
              </strong>
            </Link>
          )}
        </main>
      </Container>
    </header>
  )
}
