import { styled } from '..'

export const Container = styled('main', {
  display: 'grid',

  gridTemplateColumns: '590px 590px',

  padding: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '1rem auto',

  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

  'div.ken-slider': {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',

    width: '100%',
  },

  'div.info': {
    height: '100%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
  },

  h1: {
    fontSize: '$2xl',
    color: '$orange500',
    textAlign: 'center',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',

    textAlign: 'center',
    margin: '2rem 0',
    lineHeight: 1.4,
  },

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',

    h1: {
      fontSize: '$xl',
    },

    p: {
      fontSize: '$md',
      maxWidth: 300,
    },
  },
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, $orange500 0%, $gray900 100%)',
  borderRadius: 8,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
})

export const ButtonClearCart = styled('button', {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',

  marginTop: '1rem',
  fontSize: '$md',
  color: '$orange500',
  fontWeight: 'bold',

  '&:hover': {
    color: '$white',
  },
})
