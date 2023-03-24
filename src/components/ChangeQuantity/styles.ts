import { styled } from '@/styles'

export const Container = styled('div', {
  alignItems: 'center',
  display: 'flex',
  height: '40px',
})

export const ContentQuantity = styled('div', {
  width: '50px',
  height: '100%',
  background: '$gray800',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$orange500',
})

export const Button = styled('button', {
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

  variants: {
    add: {
      true: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
    sub: {
      true: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
    },
  },
})
