import { reduxProps } from '@/storage'
import { setSideMenu } from '@/storage/modules/side-menu/action'
import { sideMenuProps } from '@/types/sideMenu'

import { useDispatch, useSelector } from 'react-redux'

import logoCoffeIcon from '@/assets/dcoffee-logo-orange.png'

import luffy from '@/assets/luffy.png'

import {
  Container,
  ContentGroupItem,
  ContentItemList,
  GroupItem,
  ContentTop,
  ContentMain,
  ContentDown,
  Item,
} from './styles'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import {
  FaCaretDown,
  FaHome,
  FaListUl,
  FaShoppingCart,
  FaUserAlt,
} from 'react-icons/fa'

export function SideMenu() {
  const { isVisible } = useSelector<reduxProps, sideMenuProps>(
    (state) => state.sideMenu,
  )

  const [isVisibleItemList, setIsVisibleItemList] = useState(false)

  const dispatch = useDispatch()

  return (
    <Container isVisible={isVisible}>
      <ContentTop>
        <Link
          href={'/'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <Image src={logoCoffeIcon} alt="" width={100} />
        </Link>
        <button onClick={() => dispatch(setSideMenu({ isVisible: false }))}>
          {/* <Image src={closeSideMenu} alt="" width={30} /> */}
        </button>
      </ContentTop>
      <ContentMain>
        <Item
          href={'/'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <FaHome size={25} />
          <strong>Início</strong>
        </Item>
        <Item
          href={'/cart'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <FaShoppingCart size={25} />
          <strong>Carrinho</strong>
        </Item>
        <Item
          href={'/profile'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <FaUserAlt size={25} />
          <strong>Minha conta</strong>
        </Item>
        <ContentGroupItem>
          <GroupItem
            isVisible={isVisibleItemList}
            onClick={() => setIsVisibleItemList(!isVisibleItemList)}
          >
            <div className="title">
              <FaListUl size={25} />
              <strong>Categorias</strong>
            </div>
            <FaCaretDown />
          </GroupItem>
          <ContentItemList
            isVisible={isVisibleItemList}
            onClick={(e) => e.preventDefault()}
          >
            <Link
              href={`/products/actionFigure`}
              onClick={() => dispatch(setSideMenu({ isVisible: false }))}
            >
              Action Figure
            </Link>
            <Link
              href={`/products/cafe`}
              onClick={() => dispatch(setSideMenu({ isVisible: false }))}
            >
              Café
            </Link>
            <Link
              href={`/products/copo`}
              onClick={() => dispatch(setSideMenu({ isVisible: false }))}
            >
              Copos e Garrafas
            </Link>
          </ContentItemList>
        </ContentGroupItem>
      </ContentMain>

      <ContentDown>
        <Image src={luffy} alt="" width={200} />
      </ContentDown>
    </Container>
  )
}
