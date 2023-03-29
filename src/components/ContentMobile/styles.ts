import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'none',

  '@media (max-width: 900px)': {
    display: 'block',
  },
})
