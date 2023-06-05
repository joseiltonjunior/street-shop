import { styled } from '@/styles'

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

    '.logo': {
      display: 'none',
    },
  },
})

export const PrevButton = styled('button', {
  marginLeft: 'auto',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
})

export const UserButton = styled(Link, {
  marginLeft: 'auto',

  svg: {
    fill: '$gray800',
    width: 30,
    height: 30,
  },
})

export const MenuButton = styled('button', {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',

  overflow: 'hidden',

  display: 'none',

  '@media (max-width: 900px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const CartButton = styled(Link, {
  color: '$white',
  textDecoration: 'none',

  position: 'relative',

  svg: {
    fill: '$gray800',
    width: 30,
    height: 30,
  },

  div: {
    position: 'absolute',
    top: -5,

    left: 20,
    fontSize: '12px',
    border: '1px solid $orange500',
    fontWeight: 'bold',
    borderRadius: '10px',
    background: '$gray900',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1rem',
    height: '1rem',
  },
})

export const ContentLinks = styled('div', {
  gap: 5,
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  maxWidth: 500,

  a: {
    color: '$gray900',
    fontWeight: 'bold',
    textDecoration: 'none',
  },

  'div.links': {
    display: 'flex',
    gap: '1rem',

    '@media (max-width: 900px)': {
      'div, a': {
        display: 'none',
      },
    },
  },
})
