import { reduxProps } from '@/storage'
import { setSideMenu } from '@/storage/modules/side-menu/action'
import { sideMenuProps } from '@/types/sideMenu'

import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import Link from 'next/link'
import {
  FaCaretDown,
  FaCaretUp,
  FaHome,
  FaListUl,
  FaRegWindowClose,
  FaShoppingCart,
  FaUserAlt,
} from 'react-icons/fa'
import { SearchInput } from '@/components/form/SearchInput'

export function SideMenu() {
  const { isVisible } = useSelector<reduxProps, sideMenuProps>(
    (state) => state.sideMenu,
  )

  const [isVisibleItemList, setIsVisibleItemList] = useState(false)

  const dispatch = useDispatch()

  return (
    <main
      className={`absolute h-[100vh] w-full bg-white text-gray-800 fill-gray-900 z-[999] ${
        !isVisible && 'hidden'
      }`}
    >
      <header className="p-6">
        <button onClick={() => dispatch(setSideMenu({ isVisible: false }))}>
          <FaRegWindowClose size={25} className="fill-[#7928ca]" />
        </button>
        <SearchInput
          className="mt-2"
          action={() => dispatch(setSideMenu({ isVisible: false }))}
        />
      </header>

      <nav className="p-6 flex flex-col gap-5 ">
        <Link
          className="flex gap-2 items-center"
          href={'/'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <FaHome size={25} className="fill-[#7928ca]" />
          <strong>Home</strong>
        </Link>
        <Link
          className="flex gap-2 items-center"
          href={'/cart'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <FaShoppingCart size={25} className="fill-[#7928ca]" />
          <strong>Carrinho</strong>
        </Link>
        <Link
          className="flex gap-2 items-center"
          href={'/profile'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <FaUserAlt size={25} className="fill-[#7928ca]" />
          <strong>Minha conta</strong>
        </Link>
        <div>
          <button
            onClick={() => setIsVisibleItemList(!isVisibleItemList)}
            className="flex justify-between w-full"
          >
            <div className="flex gap-2">
              <FaListUl size={25} className="fill-[#7928ca]" />
              <strong>Categorias</strong>
            </div>
            {isVisibleItemList ? (
              <FaCaretUp className="fill-[#7928ca]" />
            ) : (
              <FaCaretDown className="fill-[#7928ca]" />
            )}
          </button>
          <div
            onClick={(e) => e.preventDefault()}
            className={`flex flex-col gap-2 mt-3 ml-4 ${
              !isVisibleItemList && 'hidden'
            }`}
          >
            <Link
              href={`/products/actionFigure`}
              onClick={() => dispatch(setSideMenu({ isVisible: false }))}
            >
              Action Figures
            </Link>
            <Link
              href={`/products/cafe`}
              onClick={() => dispatch(setSideMenu({ isVisible: false }))}
            >
              Café Gourmet
            </Link>
            <Link
              href={`/products/copo`}
              onClick={() => dispatch(setSideMenu({ isVisible: false }))}
            >
              Copos e Garrafas
            </Link>
          </div>
        </div>
      </nav>
    </main>
  )
}
