import { styled } from '@/styles/index'

export const ProductContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, $orange500 0%, $gray900 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$white',
  },

  span: {
    display: 'block',
    color: '$orange500',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  '@media (max-width: 900px)': {
    h1: {
      fontSize: '$xl',
      marginTop: '1rem',
    },

    span: {
      fontSize: '$lg',
    },

    p: {
      fontSize: '1rem',
      marginTop: '1rem',
    },
  },
})
