import { styled } from '@/styles'

export const Container = styled('button', {
  position: 'absolute',
  zIndex: 999,
  top: '50%',

  cursor: 'pointer',

  background: '$gray800',
  padding: '0.5rem',
  borderRadius: '50%',

  border: 'none',

  variants: {
    orientation: {
      Right: {
        right: 10,
      },
      Left: {
        left: 10,
      },
    },
  },
})
