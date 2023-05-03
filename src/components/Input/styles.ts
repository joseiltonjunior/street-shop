import { styled } from '@/styles'

export const Container = styled('main', {
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  height: '40px',

  borderRadius: 8,
  border: '1.5px solid $gray100',

  overflow: 'hidden',
  padding: '0 0.5rem',

  svg: {
    fill: '$gray100',
  },

  input: {
    border: 'none',
    background: 'transparent',
    height: '100%',
    width: '100%',
    outline: 'none',
    color: '$gray100',
    fontSize: '0.9rem',

    '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &textarea:-webkit-autofill, &textarea:-webkit-autofill:hover, &textarea:-webkit-autofill:focus, &select:-webkit-autofill, &select:-webkit-autofill:hover, &select:-webkit-autofill:focus':
      {
        border: 'none',
        WebkitTextFillColor: '#fff !important',
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
        transition: 'background-color 5000s ease-in-out 0s',
      },
  },

  variants: {
    isFocused: {
      true: {
        border: '1.5px solid $orange500',

        svg: {
          fill: '$orange500',
        },
      },
    },
    isError: {
      true: {
        border: '1.5px solid $red500',

        svg: {
          fill: '$red500',
        },
      },
    },
  },
})
