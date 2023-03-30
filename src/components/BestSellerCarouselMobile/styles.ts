import { styled } from '@/styles/index'
import Link from 'next/link'

export const HomeContainer = styled('main', {
  display: 'flex',
  overflow: 'hidden',
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, $orange500 0%, $gray900 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  textDecoration: 'none',

  display: 'grid',
  gridTemplateRows: '1fr 6rem',

  div: {
    display: 'flex',
    position: 'relative',
  },

  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },

  footer: {
    padding: '1rem',
    borderRadius: '0 0 6px 6px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    background:
      'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',

    strong: {
      fontSize: '$lg',
      color: '$white',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$orange500',
    },

    '@media (max-width: 900px)': {
      span: {
        fontSize: '$lg',
      },

      strong: {
        fontSize: '$md',
      },
    },
  },
})

export const ButtonPrev = styled('button', {
  border: 'none',
  position: 'absolute',
  left: 10,
  top: '50%',

  background: '$gray800',
  padding: '0.3rem',
  borderRadius: '50%',
})

export const ButtonNext = styled('button', {
  border: 'none',
  position: 'absolute',
  top: '50%',
  right: 10,

  background: '$gray800',
  padding: '0.3rem',
  borderRadius: '50%',
})
