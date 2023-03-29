import { styled } from '..'

export const Container = styled('div', {
  width: '100%',

  padding: '0 1rem 1rem',

  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

  margin: '0 auto',

  h3: {
    fontSize: '$xl',
    margin: '1rem 0',
  },

  '.button': {
    marginTop: 'auto',

    button: {
      width: '100%',
    },

    '@media (max-width: 900px)': {
      marginTop: '4rem',
    },
  },
})

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
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
    width: '100%',
    height: '100%',
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
    fontSize: '$2xl',
    color: '$orange500',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  '@media (max-width: 900px)': {
    'h1, span': {
      fontSize: '$xl',
    },

    p: {
      fontSize: '$sm',
    },
  },
})
