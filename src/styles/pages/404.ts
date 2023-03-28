import { styled } from '..'

export const Container = styled('div', {
  width: '100%',

  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 1rem',

  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '@media (min-height: 700px)': {
      minHeight: 656,
    },
  },

  img: {
    objectFit: 'contain',
    width: '100%',
  },

  p: {
    fontSize: '$lg',
    fontWeight: 'bold',
    maxWidth: 500,
    textAlign: 'center',
  },

  button: {
    background: 'transparent',
    border: 'none',

    color: '$orange500',

    cursor: 'pointer',

    fontSize: '$lg',
    fontWeight: 'bold',
    marginTop: '5rem',
    transition: 'all 0.2s',

    '&:hover': {
      color: '$white',
    },
  },
})
