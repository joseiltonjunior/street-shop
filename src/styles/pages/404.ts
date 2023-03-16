import { styled } from '..'

export const Container = styled('div', {
  width: '100%',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

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
    objectFit: 'cover',
  },

  p: {
    fontSize: '$lg',
    fontWeight: 'bold',
    maxWidth: 500,
    textAlign: 'center',
  },

  button: {
    background: 'transparent',
    border: '1px solid $gray100',
    padding: '0.8rem',
    color: '$gray100',
    borderRadius: 8,
    cursor: 'pointer',
    width: '100%',
    fontSize: '$sm',
    fontWeight: 'bold',
    marginTop: '5rem',
    transition: 'all 0.2s',

    '&:hover': {
      background: '$gray100',
      color: '$gray800',
    },
  },
})
