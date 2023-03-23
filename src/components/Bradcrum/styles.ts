import { styled } from '@stitches/react'
import Link from 'next/link'

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto 0',

  alignItems: 'center',
})

export const ActualPage = styled('div', {
  color: '$gray800',
  fontWeight: 'bold',
  padding: ' 0.5rem',
  left: '10px',
  background: '$orange500',
  position: 'relative',
  display: 'flex',
  borderRight: '1px solid $orange500',

  '@media (max-width: 900px)': {
    width: 'calc(100vw - 70px)',
  },

  gap: '1rem',

  select: {
    background: 'transparent',
    border: 'none',
    fontWeight: 'bold',
    color: '$gray900',
    width: '100%',
    fontSize: '$sm',
    outline: 'none',
  },

  p: {
    overflow: 'hidden',
    textAlign: 'center',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
  },

  paddingLeft: '20px',

  '&::before': {
    content: '',
    position: 'absolute',
    transform: 'rotate(90deg)',

    padding: '1.5px',

    left: '-0.625rem',
    borderLeft: '1rem solid transparent',
    borderRight: '1rem solid transparent',
    borderBottom: '1rem solid $gray900',
  },

  '@media (min-width: 900px)': {
    '&::after': {
      content: '',
      position: 'absolute',
      transform: 'rotate(90deg)',
      right: '-1.688rem',
      padding: '1.7px',

      borderLeft: '1rem solid transparent',
      borderRight: '1rem solid transparent',
      borderBottom: '1rem solid $orange500',
    },
  },
})

export const BreadCrumbLink = styled(Link, {
  cursor: 'pointer',
  textDecoration: 'none',
  color: '$gray800',
  fontWeight: 'bold',
  padding: ' 0.5rem',
  borderRight: '1px solid $orange500',
  background: '$orange500',

  position: 'relative',

  '&::after': {
    content: '',
    position: 'absolute',
    transform: 'rotate(90deg)',

    padding: '1.7px',
    zIndex: '1000',
    borderLeft: '1rem solid transparent',
    borderRight: '1rem solid transparent',
    borderBottom: '1rem solid $orange500',
  },

  '&:hover': {
    color: '$white',
  },
})
