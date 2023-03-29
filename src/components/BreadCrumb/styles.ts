import { styled } from '@stitches/react'
import Link from 'next/link'

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '2rem auto 0.5rem',

  alignItems: 'center',

  padding: '0 1rem',

  gap: '0.5rem',
})

export const ActualPage = styled('div', {
  color: '$gray300',
  fontWeight: 'bold',

  gap: '1rem',

  '@media (max-width: 900px)': {
    maxWidth: '300px',

    p: {
      overflow: 'hidden',

      display: '-webkit-box',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
    },
  },
})

export const Separator = styled('div', {})

export const BreadCrumbLink = styled(Link, {
  cursor: 'pointer',
  textDecoration: 'none',
  color: '$orange500',
  fontWeight: 'bold',

  '&:hover': {
    color: '$white',
  },
})
