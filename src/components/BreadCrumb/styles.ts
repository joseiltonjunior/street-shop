import { styled } from '@stitches/react'
import Link from 'next/link'

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '0 auto',
  // background: 'red',
  alignItems: 'center',
})

export const ActualPage = styled('div', {
  color: '$gray300',
  fontWeight: 'bold',
  padding: ' 0.5rem',
  left: '10px',
  // background: '$orange500',
  position: 'relative',
  display: 'flex',

  maxWidth: '250px',

  gap: '1rem',

  p: {
    overflow: 'hidden',

    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
  },
})

export const BreadCrumbLink = styled(Link, {
  cursor: 'pointer',
  textDecoration: 'none',
  color: '$orange500',
  fontWeight: 'bold',
  padding: ' 0.5rem',

  // background: '$orange500',

  position: 'relative',

  '&:hover': {
    color: '$white',
  },
})
