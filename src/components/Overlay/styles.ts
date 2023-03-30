import { styled } from '@/styles'

export const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.3)',

  position: 'absolute',
  zIndex: 999,

  display: 'none',

  variants: {
    isVisible: {
      true: {
        '@media (max-width: 900px)': {
          display: 'block',
        },
      },
    },
  },
})
