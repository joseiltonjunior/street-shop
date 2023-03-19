import { styled } from '@stitches/react'
import Link from 'next/link'

export const Container = styled('div', {
  display: 'flex',
})

export const ActualPage = styled('div', {
  color: '$gray300',
  fontWeight: 'bold',
  padding: ' 0.5rem',
  left: '10px',
  background: '$purple300',
  position: 'relative',
  display: 'flex',
  borderRight: '1px solid $purple300',

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
      borderBottom: '1rem solid $purple300',
    },
  },
})

export const BreadCrumbLink = styled(Link, {
  cursor: 'pointer',
  textDecoration: 'none',
  color: '$gray100',
  fontWeight: 'bold',
  padding: ' 0.5rem',
  borderRight: '1px solid $purple300',
  background: '$purple300',

  position: 'relative',

  '&::after': {
    content: '',
    position: 'absolute',
    transform: 'rotate(90deg)',

    padding: '1.7px',
    zIndex: '1000',
    borderLeft: '1rem solid transparent',
    borderRight: '1rem solid transparent',
    borderBottom: '1rem solid $purple300',
  },

  '&:hover': {
    background: '$purple500',
    borderRight: '1px solid $purple500',

    '&::after': {
      borderBottom: '1rem solid $purple500',
    },
  },
})
