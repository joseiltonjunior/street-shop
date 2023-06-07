import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  gap: '2rem',
  height: '100%',
  justifyContent: 'space-between',

  '@media (max-width: 900px)': {
    gap: '1rem',
    width: '100%',
  },
})
