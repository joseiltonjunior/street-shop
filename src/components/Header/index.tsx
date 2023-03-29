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
  ContentLinks,
  PrevButton,
} from './styles'
import Link from 'next/link'
import { Select } from '../Select'

export function Header({
  buttonPrev,
  inputSearch,
  buttonCart,
  buttonMenu,
  isLink,
}: HeaderProps) {
  const router = useRouter()

  return (
    <Container>
      <Link href={'/'}>
        <LogoWeb src={logoCoffeIcon} alt="" width={130} />

        <LogoMobile src={logoCoffeOnlyIcon} alt="" width={30} />
      </Link>

      {isLink && (
        <ContentLinks>
          {inputSearch && <SearchInput />}

          <div className="links">
            <Select
              name="Categoria"
              onAction={(e) => console.log(e.value)}
              itens={[
                { name: 'Todos', value: '' },
                { name: 'Café', value: 'cafe' },
                { name: 'Copos e Garrafas', value: 'copo' },
              ]}
            />
            <Link
              href={'/contact'}
              style={{
                textDecoration: 'none',
                color: '#121214',
                fontWeight: ' bold',
              }}
            >
              Contato
            </Link>
            <Link
              href={'/about'}
              style={{
                textDecoration: 'none',
                color: '#121214',
                fontWeight: ' bold',
              }}
            >
              Sobre
            </Link>
          </div>
        </ContentLinks>
      )}

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

      <MenuButton>
        <Image src={listIcon} alt="" width={30} />
      </MenuButton>
    </Container>
  )
}
