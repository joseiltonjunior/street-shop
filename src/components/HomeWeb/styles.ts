import { styled } from '@/styles/index'
import Link from 'next/link'

export const ButtonPrev = styled('div', {
  position: 'absolute',
  zIndex: '1000',
  top: '55%',
  left: 100,
  cursor: 'pointer',
})

export const ButtonNext = styled('div', {
  position: 'absolute',
  zIndex: '1000',
  top: '55%',
  right: 10,
  cursor: 'pointer',
})

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  height: '100%',

  overflow: 'hidden',

  '@media (min-height: 700px)': {
    minHeight: 656,
  },
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, $purple300 0%, $gray300 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$white',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$gray300',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})
