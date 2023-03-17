import { styled } from '..'

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',

  alignItems: 'center',
  margin: '0 auto',

  '@media (min-height: 700px)': {
    minHeight: 656,
  },

  h1: {
    fontSize: '$2xl',
    color: '$white',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 500,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    fontSize: '$lg',
    color: '$purple300',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$purple500',
    },
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, $purple300 0%, $gray300 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  marginTop: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})
