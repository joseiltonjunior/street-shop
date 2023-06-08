import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'

import { SearchInput } from '../SearchInput'

import logoCoffeIcon from '@/assets/new-logo.png'
import listIcon from '@/assets/list.svg'
import { setSideMenu } from '@/storage/modules/side-menu/action'
import { HeaderProps } from '@/types/header'
import { reduxProps } from '@/storage'

export function Header({ buttonCart, lengthCart, isUser }: HeaderProps) {
  const dispatch = useDispatch()

  const token = useSelector<reduxProps, string>((state) => state.token)

  return (
    <header className="bg-gradient-to-br from-indigo-800 to-indigo-600 flex gap-4 justify-between items-center w-full p-4  pl-8 pr-8">
      <button
        onClick={() => dispatch(setSideMenu({ isVisible: true }))}
        className="hidden md:block"
      >
        <Image src={listIcon} alt="home button" />
      </button>

      <Link href={'/'} title="Ir para a página inicial">
        <Image src={logoCoffeIcon} alt="logo" width={50} height={50} />
      </Link>

      <div className="flex items-center gap-4 text-white md:hidden font-bold">
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
            <AiOutlineUser size={30} className="fill-white" />
          </Link>
        )}
        {buttonCart && (
          <Link href="/cart" title="Abrir carrinho" className="relative">
            <AiOutlineShoppingCart size={30} className="fill-white" />
            <strong className="absolute bg-white text-gray-800 rounded-full w-4 h-4 flex items-center justify-center text-[12px] bottom-0  left-6">
              {lengthCart}
            </strong>
          </Link>
        )}
      </div>
    </header>
  )
}
