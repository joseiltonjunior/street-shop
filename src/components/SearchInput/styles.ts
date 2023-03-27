import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  background: '$white',
  alignItems: 'center',
  width: '500px',
  //   padding: '10px',
  //   paddingRight: '0.5rem',
  borderRadius: 5,
  height: '35px',

  // position: 'relative',
  //   overflow: 'hidden',

  '@media (min-width: 900px)': {
    position: 'relative',
  },

  img: {
    objectFit: 'cover',
    height: '100%',
  },

  input: {
    // background: 'red',
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

    zIndex: 9999,

    '@media (max-width: 900px)': {
      top: 60,
    },

    a: {
      padding: 5,
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: '$gray900',
      gap: '1rem',
      fontSize: '$sm',

      '&:hover': {
        background: '$gray100',
      },
    },

    'a+a': {
      borderTop: '1px solid $gray100',
    },
  },
})
