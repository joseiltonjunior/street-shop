import { styled } from '@/styles'

export const Container = styled('div', {
  '@media (max-width: 900px)': {
    display: 'none',
  },

  variants: {
    mobile: {
      true: {
        '@media (max-width: 900px)': {
          display: 'block',
        },
      },
    },
  },
})
