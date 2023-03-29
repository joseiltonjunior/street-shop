import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'block',

  '@media (max-width: 900px)': {
    display: 'none',
  },
})
