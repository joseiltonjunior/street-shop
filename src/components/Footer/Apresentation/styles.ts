import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  '@media (min-width: 900px)': {
    maxWidth: 300,
  },
})
