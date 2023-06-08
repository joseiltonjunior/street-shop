import { styled } from '@stitches/react'

export const Container = styled('button', {
  marginTop: 'auto',

  border: 0,
  color: '$gray900',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bolder',
  fontSize: '$md',
  height: '3rem',
  width: '100%',
  transition: 'all 0.3s',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    height: '100%',
  },

  variants: {
    theme: {
      primary: {
        background: '$orange500',

        '&:hover': {
          color: '$white',
        },
      },
      secondary: {
        background: 'transparent',
        border: '1px solid $gray100',
        color: '$gray100',

        '&:hover': {
          background: '$gray100',
          color: '$gray800',
        },
      },
    },
  },
})
