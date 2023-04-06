import { styled } from '@/styles'
import Link from 'next/link'

export const Container = styled('div', {
  overflow: 'hidden',
  position: 'relative',
  height: 300,
  borderRadius: 8,
  background: '$gray800',

  div: {
    '.carousel-item': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    },
  },
})

export const Card = styled(Link, {
  height: 300,

  background: '$gray800',

  display: 'grid',
  gridTemplateRows: 'auto 80px',

  textDecoration: 'none',

  '.img': {
    borderBottom: '1px solid $gray900',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '.info': {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',

    strong: {
      color: '$orange500',
    },

    span: {
      color: '$gray300',
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
    },
  },
})
