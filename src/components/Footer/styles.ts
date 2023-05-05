import { styled } from '@/styles'
import Link from 'next/link'

export const Container = styled('div', {
  background: '$orange500',
  width: '100%',

  borderRadius: '10px 10px 0 0 ',
  position: 'relative',
  padding: '0.5rem 1rem',
  marginTop: 'auto',

  main: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '$gray900',
  },
})

export const MoreInfo = styled('div', {
  height: 0,
  transition: 'all 0.2s',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.5rem',

  '.mobile': {
    display: 'none',
  },

  '@media (max-width: 900px)': {
    flexDirection: 'column',

    '.mobile': {
      display: 'flex',
      justifyContent: 'space-between',

      width: '100%',
    },

    '.web': {
      display: 'none',
    },
  },

  variants: {
    expand: {
      true: {
        height: 'auto',
        padding: '1rem 0',
        borderBottom: '1px solid $gray900',
        marginBottom: '1rem',
      },
    },
  },
})

export const Title = styled('strong', {
  color: '$gray900',
  fontSize: '$md',
})

export const Info = styled('span', {
  color: '$gray800',
  fontSize: '14px',
})

export const Redirect = styled(Link, {
  textDecoration: 'none',
  color: '$gray800',
  fontSize: '$sm',
})

export const ExpansiveButton = styled('button', {
  top: -30,
  right: '50%',
  position: 'absolute',
  background: '$orange500',
  border: 'none',
  borderRadius: '10px 10px 0 0',
  padding: '0.5rem 1rem',
  fontWeight: 'bold',
  cursor: 'pointer',

  color: '$gray900',

  '@media (max-width: 900px)': {
    right: '30%',
  },
})

export const ButtonMoveTop = styled('button', {
  border: 'none',
  background: '$gray900',
  borderRadius: '8px',
  cursor: 'pointer',

  height: 35,
  width: 35,

  img: {
    transform: 'rotate(180deg)',
  },
})
