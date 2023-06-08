import { styled } from '@/styles'

export const Input = styled('div', {
  display: 'flex',
  border: '1px solid $gray300',
  alignItems: 'center',
  width: '100%',
  background: '$white',

  borderRadius: 3,
  overflow: 'hidden',
  height: '35px',

  img: {
    objectFit: 'cover',
    height: '100%',
  },

  input: {
    height: '100%',

    width: '100%',
    border: 'none',
    outline: 'none',
    paddingLeft: '0.5rem ',

    color: '$gray900',

    '&:placeholder': {
      color: 'red',
    },
  },

  variants: {
    listIsVisible: {
      true: {
        borderBottom: '1px solid $gray100',

        '@media (min-width: 900px)': {
          borderRadius: '5px 5px 0 0',
        },
      },
    },
  },
})

export const List = styled('div', {
  position: 'fixed',
  background: '$white',
  color: '$gray900',
  borderRadius: '0 0 5px 5px',
  width: '100%',
  maxWidth: 500,

  zIndex: 1000,

  '@media (max-width: 900px)': {
    top: 120,
    left: 0,
  },

  button: {
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    color: '$gray900',
    gap: '1rem',
    fontSize: '$sm',
    fontWeight: 'normal',

    p: {
      overflow: 'hidden',

      display: '-webkit-box',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
    },

    '&:hover': {
      background: '$gray100',
    },
  },

  'button+button': {
    borderTop: '1px solid $gray100',
  },
})

export const Container = styled('div', {})
