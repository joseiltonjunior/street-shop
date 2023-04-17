import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@media (min-width: 900px)': {
    maxWidth: 300,
  },
})
