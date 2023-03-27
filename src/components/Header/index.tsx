import Image from 'next/image'

import { SearchInput } from '../SearchInput'

import logoCoffeIcon from '@/assets/dcoffee-logo.png'
import logoCoffeOnlyIcon from '@/assets/logo-only-icon.png'
import listIcon from '@/assets/list.svg'
import cartIcon from '@/assets/shopping-cart-simple.svg'
import returnIcon from '@/assets/arrow-u-up-left.svg'

import { useRouter } from 'next/router'

import { HeaderProps } from '@/types/header'
import {
  Container,
  MenuButton,
  CartButton,
  LogoMobile,
  LogoWeb,
  PrevButton,
} from './styles'
import Link from 'next/link'

export function Header({
  buttonPrev,
  inputSearch,
  buttonCart,
  buttonMenu,
}: HeaderProps) {
  const router = useRouter()

  return (
    <Container>
      <Link href={'/'}>
        <LogoWeb src={logoCoffeIcon} alt="" width={130} />

        <LogoMobile src={logoCoffeOnlyIcon} alt="" width={30} />
      </Link>

      {inputSearch && <SearchInput />}

      {buttonPrev && (
        <PrevButton onClick={() => router.back()}>
          <Image src={returnIcon} alt="" />
        </PrevButton>
      )}

      {buttonCart && (
        <CartButton href="/cart">
          <Image src={cartIcon} alt="" />
          <div>{buttonCart}</div>
        </CartButton>
      )}

      {buttonMenu && (
        <MenuButton>
          <Image src={listIcon} alt="" width={30} />
        </MenuButton>
      )}
    </Container>
  )
}
