import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  background: '$white',
  alignItems: 'center',
  width: '100%',

  borderRadius: 5,
  height: '35px',

  '@media (min-width: 900px)': {
    position: 'relative',
  },

  img: {
    objectFit: 'cover',
    height: '100%',
  },

  input: {
    height: '100%',

    borderRadius: 5,
    width: '100%',
    border: 'none',
    outline: 'none',
    paddingLeft: '0.5rem ',

    color: '$gray900',

    '&:placeholder': {
      color: 'red',
    },
  },

  'div.result': {
    position: 'absolute',
    background: '$white',
    color: '$gray900',

    top: 40,
    left: 0,
    width: '100%',

    zIndex: 1000,

    '@media (max-width: 900px)': {
      top: 60,
    },

    button: {
      padding: 5,
      display: 'flex',
      alignItems: 'center',
      background: 'transparent',
      border: 'none',
      width: '100%',
      // textDecoration: 'none',
      color: '$gray900',
      gap: '1rem',
      fontSize: '$sm',
      fontWeight: 'normal',

      '&:hover': {
        background: '$gray100',
      },
    },

    'button+button': {
      borderTop: '1px solid $gray100',
    },
  },
})
