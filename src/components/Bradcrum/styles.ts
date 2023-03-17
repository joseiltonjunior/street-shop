import { styled } from '@stitches/react'
import Link from 'next/link'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',

  marginLeft: 'auto',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  width: '100%',
  marginBottom: '1rem',
})

export const ActualPage = styled('div', {
  color: '$gray300',
  fontWeight: 'bold',
  padding: ' 0.5rem',
  left: '10px',
  background: '$purple500',
  position: 'relative',
  display: 'flex',
  borderRight: '1px solid $purple500',

  '@media (max-width: 900px)': {
    width: 'calc(100% - 70px)',
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
      borderBottom: '1rem solid $purple500',
    },
  },
})

export const BreadCrumbLink = styled(Link, {
  cursor: 'pointer',
  textDecoration: 'none',
  color: '$gray100',
  fontWeight: 'bold',
  padding: ' 0.5rem',
  borderRight: '1px solid $purple500',
  background: '$purple500',

  position: 'relative',

  '&::after': {
    content: '',
    position: 'absolute',
    transform: 'rotate(90deg)',

    padding: '1.7px',
    zIndex: '1000',
    borderLeft: '1rem solid transparent',
    borderRight: '1rem solid transparent',
    borderBottom: '1rem solid $purple500',
  },

  '&:hover': {
    background: '$purple300',
    borderRight: '1px solid $purple300',
    color: '$gray900',
    '&::after': {
      borderBottom: '1rem solid $purple300',
    },
  },
})
