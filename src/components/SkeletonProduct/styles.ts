import { styled } from '@/styles'

export const Container = styled('main', {
  '@media (max-width: 900px)': {
    '.responsive': {
      height: '350px !important',
    },
  },
})
