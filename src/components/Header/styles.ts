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
