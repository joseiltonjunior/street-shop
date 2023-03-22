import { styled } from '@/styles'

export const Container = styled('div', {
  alignItems: 'center',
  //   marginTop: '1rem',
  display: 'flex',

  //   width: '100%',
  //   maxWidth: '110px',
  height: '40px',

  //   background: 'green',

  button: {
    background: '$orange500',
    fontSize: '$md',
    fontWeight: 'bold',
    width: '40px',
    height: '100%',
    border: 'none',
    cursor: 'pointer',
    color: '$gray900',

    '&:hover': {
      color: '$white',
    },
  },

  '.add': {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  '.sub': {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  div: {
    width: '50px',
    height: '100%',
    background: '$gray800',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '$orange500',
  },
})
