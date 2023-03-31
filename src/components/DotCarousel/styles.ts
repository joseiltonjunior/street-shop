import { styled } from '@/styles'

export const Container = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  marginTop: '5px',
})

export const Dot = styled('button', {
  width: 15,
  height: 15,
  border: '2px solid $gray800',
  background: '$gray800',
  borderRadius: 15,
  cursor: 'pointer',

  variants: {
    currentSlide: {
      true: {
        background: '$orange500',
      },
    },
  },
})
