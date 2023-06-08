import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBars,
} from 'react-icons/ai'

import { SearchInput } from '../../form/SearchInput'

import logoCoffeIcon from '@/assets/new-logo.png'

import { setSideMenu } from '@/storage/modules/side-menu/action'
import { HeaderProps } from '@/types/header'
import { reduxProps } from '@/storage'

export function Header({ buttonCart, lengthCart, isUser }: HeaderProps) {
  const dispatch = useDispatch()

  const token = useSelector<reduxProps, string>((state) => state.token)

  return (
    <header className="bg-white flex gap-4 justify-between items-center w-full p-3  pl-8 pr-8">
      <button
        onClick={() => dispatch(setSideMenu({ isVisible: true }))}
        className="hidden md:block"
      >
        <AiOutlineBars size={30} className="fill-gray-800" />
      </button>

      <Link href={'/'} title="Ir para a página inicial">
        <Image src={logoCoffeIcon} alt="logo" width={35} height={35} />
      </Link>

      <div className="flex items-center gap-4 text-gray-800 md:hidden">
        <Link href={'/products/actionFigure'} className="hover:text-gray-400">
          Action Figures
        </Link>
        <Link href={'/products/cafe'} className="hover:text-gray-400 ">
          Cafés
        </Link>
        <Link href={'/products/copo'} className="hover:text-gray-400">
          Copos
        </Link>
      </div>

      <SearchInput className="w-[500px] md:hidden ml-auto mr-auto" />

      <div className="flex gap-2 md:ml-0 ml-auto">
        {isUser && (
          <Link
            className="md:hidden"
            title="Minha conta"
            href={token.length > 0 ? '/profile' : '/sign-in'}
          >
            <AiOutlineUser size={30} className="fill-gray-800" />
          </Link>
        )}
        {buttonCart && (
          <Link href="/cart" title="Abrir carrinho" className="relative">
            <AiOutlineShoppingCart size={30} className="fill-gray-800" />
            <span className="absolute bg-gray-800 text-gray-100 rounded-full w-4 h-4 flex items-center justify-center text-[12px] bottom-0  left-6">
              {lengthCart}
            </span>
          </Link>
        )}
      </div>
    </header>
  )
}
