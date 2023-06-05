import Image from 'next/image'

import { SearchInput } from '../SearchInput'

import logoCoffeIcon from '@/assets/dcoffee-logo.png'

import listIcon from '@/assets/list.svg'
// import cartIcon from '@/assets/shopping-cart-simple.svg'
import returnIcon from '@/assets/arrow-u-up-left.svg'

import { useRouter } from 'next/router'

import { HeaderProps } from '@/types/header'
import Link from 'next/link'
import { Select } from '../Select'
import { useDispatch, useSelector } from 'react-redux'
import { setSideMenu } from '@/storage/modules/side-menu/action'

import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'

import {
  Container,
  MenuButton,
  CartButton,
  ContentLinks,
  PrevButton,
  UserButton,
} from './styles'
import { reduxProps } from '@/storage'
import { ResponseUserProps } from '@/types/user'

export function Header({
  buttonPrev,
  inputSearch,
  buttonCart,
  lengthCart,
  isLink,
  isUser,
}: HeaderProps) {
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector<reduxProps, ResponseUserProps>((state) => state.user)

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
      {isUser && (
        <UserButton
          title="Minha conta"
          href={user.id ? '/profile' : '/sign-in'}
        >
          <FaUserCircle />
        </UserButton>
      )}
      {buttonCart && (
        <CartButton href="/cart" title="Abrir carrinho">
          <FaShoppingCart />
          <div>{lengthCart}</div>
        </CartButton>
      )}
    </Container>
  )
}
