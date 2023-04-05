import { reduxProps } from '@/storage'
import { setSideMenu } from '@/storage/modules/sideMenu/action'
import { sideMenuProps } from '@/types/sideMenu'

import { useDispatch, useSelector } from 'react-redux'

import logoCoffeIcon from '@/assets/dcoffee-logo-orange.png'
import closeSideMenu from '@/assets/x.svg'
import separator from '@/assets/separator.png'
import luffy from '@/assets/luffy.png'
import caretDown from '@/assets/caret-down.svg'

import {
  Container,
  // Item,
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
          <Image src={closeSideMenu} alt="" width={30} />
        </button>
      </ContentTop>
      <ContentMain>
        <Item
          href={'/'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <Image src={separator} alt="" width={30} />
          <strong>Início</strong>
        </Item>
        <ContentGroupItem>
          <GroupItem
            isVisible={isVisibleItemList}
            onClick={() => setIsVisibleItemList(!isVisibleItemList)}
          >
            <div className="title">
              <Image src={separator} alt="" width={30} />
              <strong>Categorias</strong>
            </div>
            <Image src={caretDown} alt="" width={20} className="caretDown" />
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
        {/* <Item
          href={'/contant'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <Image src={separator} alt="" width={30} />
          <strong>Contato</strong>
        </Item>

        <Item
          href={'/about'}
          onClick={() => dispatch(setSideMenu({ isVisible: false }))}
        >
          <Image src={separator} alt="" width={30} />
          <strong>Sobre</strong>
        </Item> */}
      </ContentMain>

      <ContentDown>
        <Image src={luffy} alt="" width={200} />
      </ContentDown>
    </Container>
  )
}
