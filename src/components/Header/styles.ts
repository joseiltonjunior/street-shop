import { styled } from '@/styles'
import Image from 'next/image'
import Link from 'next/link'

export const Container = styled('div', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  //   background: 'red',

  display: 'flex',
  alignItems: 'center',
  //   justifyContent: 'space-between',
  gap: '1rem',
  //   position: 'relative',

  '@media (max-width: 900px)': {
    justifyContent: 'center',
    padding: '1rem',
  },
})

export const LogoMobile = styled(Image, {
  display: 'none',
  width: '35px',
  height: '35px',

  '@media (max-width: 900px)': {
    display: 'block',
  },
})

export const LogoWeb = styled(Image, {
  '@media (max-width: 900px)': {
    display: 'none',
  },
})

export const PrevButton = styled('button', {
  marginLeft: 'auto',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
})

export const MenuButton = styled('button', {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',

  img: {
    width: '30px',
    height: '30px',
  },
})

export const CartButton = styled(Link, {
  color: '$gray900',
  textDecoration: 'none',
  cursor: 'pointer',

  marginLeft: 'auto',

  position: 'relative',

  div: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: '12px',

    fontWeight: 'bold',
    borderRadius: '10px',
    background: '$orange500',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
  },

  img: {
    width: '30px',
    height: '30px',
  },
})
