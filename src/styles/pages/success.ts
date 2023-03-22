import { styled } from '..'

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',

  alignItems: 'center',
  margin: '0 auto',

  '@media (min-height: 700px)': {
    minHeight: 656,
  },

  div: {
    display: 'flex',
    overflow: 'hidden',
    width: '250px',
  },

  h1: {
    fontSize: '$2xl',
    color: '$orange500',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 500,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },
})

export const ImageContainer = styled('div', {
  width: '100%',

  background: 'linear-gradient(180deg, $orange500 0%, $gray900 100%)',
  borderRadius: 8,
  marginTop: '1rem',

  img: {
    objectFit: 'cover',
  },
})

export const ButtonClearCart = styled('button', {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',

  marginTop: '5rem',
  fontSize: '$lg',
  color: '$orange500',
  fontWeight: 'bold',

  '&:hover': {
    color: '$white',
  },
})
