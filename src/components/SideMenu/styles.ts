import { styled } from '@/styles'
import Link from 'next/link'

export const Container = styled('div', {
  width: 300,
  height: '100vh',
  zIndex: 1000,
  background: '$gray800',

  position: 'absolute',
  display: 'none',

  variants: {
    isVisible: {
      true: {
        '@media (max-width: 900px)': {
          display: 'grid',
          gridTemplateRows: '80px auto 1fr',
        },
      },
    },
  },
})

export const ContentTop = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '1rem',

  borderBottom: '1px solid $orange500',

  button: {
    background: 'transparent',

    border: 'none',
  },
})

export const ContentMain = styled('div', {
  borderBottom: '1px solid $orange500',
})

export const ContentDown = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
})

export const Item = styled(Link, {
  width: '100%',
  border: 'none',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'transparent',
  marginBottom: '1px',
  textDecoration: 'none',

  padding: '1rem',

  color: '$gray100',
  fontWeight: 'bold',
  fontSize: '$sm',

  div: {
    display: 'none',
    flexDirection: 'column',
  },
})

export const GroupItem = styled('div', {
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '.title': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  '.caretDown': {
    transition: 'all 0.2s',
  },

  variants: {
    isVisible: {
      true: {
        '.caretDown': {
          transform: 'rotate(180deg)',
        },
      },
    },
  },
})

export const ContentGroupItem = styled('button', {
  width: '100%',
  border: 'none',

  background: 'transparent',

  color: '$gray100',

  fontSize: '$sm',
})

export const ContentItemList = styled('div', {
  background: '$gray900',
  zIndex: 1000,
  display: 'none',
  flexDirection: 'column',
  alignItems: 'flex-start',

  a: {
    color: '$gray300',
    padding: '0.5rem 1.5rem',
    width: '100%',
    fontSize: '$sm',
    textDecoration: 'none',

    textAlign: 'left',
  },

  'span+span': {
    borderTop: '1px solid $gray800',
  },

  variants: {
    isVisible: {
      true: {
        display: 'flex',
      },
    },
  },
})
