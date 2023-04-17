import Image from 'next/image'

import { SearchInput } from '../SearchInput'

import logoCoffeIcon from '@/assets/dcoffee-logo.png'

import listIcon from '@/assets/list.svg'
import cartIcon from '@/assets/shopping-cart-simple.svg'
import returnIcon from '@/assets/arrow-u-up-left.svg'

import { useRouter } from 'next/router'

import { HeaderProps } from '@/types/header'
import Link from 'next/link'
import { Select } from '../Select'
import { useDispatch } from 'react-redux'
import { setSideMenu } from '@/storage/modules/sideMenu/action'

import {
  Container,
  MenuButton,
  CartButton,
  ContentLinks,
  PrevButton,
} from './styles'

export function Header({
  buttonPrev,
  inputSearch,
  buttonCart,
  lengthCart,
  isLink,
}: HeaderProps) {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <Container>
      <MenuButton onClick={() => dispatch(setSideMenu({ isVisible: true }))}>
        <Image src={listIcon} alt="" />
      </MenuButton>
      <Link href={'/'} className="logo" title="Ir para a página inicial">
        <Image src={logoCoffeIcon} alt="" width={130} />
      </Link>
      {isLink && (
        <ContentLinks>
          {inputSearch && <SearchInput />}

          <div className="links">
            <Link href={'/'}>Início</Link>
            <Select
              name="Categorias"
              onAction={(e) => router.push(`/products/${e.value}`)}
              itens={[
                { name: 'Action Figure', value: 'actionFigure' },
                { name: 'Café', value: 'cafe' },
                { name: 'Copos e Garrafas', value: 'copo' },
              ]}
            />
          </div>
        </ContentLinks>
      )}
      {buttonPrev && (
        <PrevButton onClick={() => router.back()}>
          <Image src={returnIcon} alt="" />
        </PrevButton>
      )}
      {buttonCart && (
        <CartButton href="/cart" title="Abrir carrinho">
          <Image src={cartIcon} alt="" />
          <div>{lengthCart}</div>
        </CartButton>
      )}
    </Container>
  )
}
