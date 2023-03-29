import { styled } from '@/styles/index'
import Link from 'next/link'

export const ButtonPrev = styled('div', {
  position: 'absolute',
  zIndex: '1000',
  top: '50%',
  left: 10,
  cursor: 'pointer',

  background: '$gray800',
  padding: '1rem',
  borderRadius: '50%',
})

export const ButtonNext = styled('div', {
  position: 'absolute',
  zIndex: '1000',
  top: '55%',
  right: 10,
  cursor: 'pointer',

  background: '$gray800',
  padding: '1rem',
  borderRadius: '50%',
})

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',

  height: '100%',
  position: 'relative',
  overflow: 'hidden',
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, $orange500 0%, $gray900 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  // height: 400,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'contain',
  },

  footer: {
    bottom: '0.25rem',
    gap: '1rem',
    padding: '1rem',

    borderRadius: '0 0 6px 6px',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '5rem',

    background:
      'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',

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
      color: '$orange500',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})
