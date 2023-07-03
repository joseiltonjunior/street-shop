import { styled } from '@stitches/react'
import Image from 'next/image'

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '2rem auto 0.5rem',

  alignItems: 'center',

  gap: '0.5rem',

  '@media (max-width: 900px)': {
    '.skeleton': {
      width: 'calc(100vw - 2rem) !important',
    },
  },
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

export const Separator = styled(Image, {})

export const BreadCrumbLink = styled('button', {
  cursor: 'pointer',
  fontSize: 'medium',
  color: '$orange500',
  fontWeight: 'bold',
  background: 'transparent',
  border: 'none',

  '&:hover': {
    color: '$white',
  },
})
