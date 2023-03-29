import { styled } from '@/styles'
import Image from 'next/image'
import Link from 'next/link'

export const Container = styled('div', {
  padding: '1rem 2rem 0.5rem',
  width: '100%',

  background: '$orange500',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  gap: '1rem',

  '@media (max-width: 900px)': {
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

  display: 'none',

  img: {
    width: '30px',
    height: '30px',
  },

  '@media (max-width: 900px)': {
    display: 'block',
  },
})

export const CartButton = styled(Link, {
  color: '$orange500',
  textDecoration: 'none',
  cursor: 'pointer',

  marginLeft: 'auto',

  position: 'relative',

  div: {
    position: 'absolute',
    top: -5,

    left: 20,
    fontSize: '12px',

    fontWeight: 'bold',
    borderRadius: '10px',
    background: '$gray800',
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

export const ContentLinks = styled('div', {
  gap: 5,
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  maxWidth: 500,

  'div.links': {
    display: 'flex',
    gap: 10,

    '@media (max-width: 900px)': {
      'div, a': {
        display: 'none',
      },
    },
  },
})
