import { styled } from '@/styles/index'
// import Link from 'next/link'

export const HomeContainer = styled('main', {
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
})

export const Product = styled('a', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0.5rem',

  div: {
    display: 'flex',
    height: '100%',
    position: 'relative',
  },

  img: {
    objectFit: 'cover',

    height: '100%',
    width: '100%',
  },

  footer: {
    padding: '1rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },
  },
})

export const ButtonPrev = styled('button', {
  border: 'none',
  position: 'absolute',
  left: 0,
  top: '50%',

  background: 'transparent',
})

export const ButtonNext = styled('button', {
  border: 'none',
  position: 'absolute',
  top: '50%',
  right: 0,

  background: 'transparent',
})
