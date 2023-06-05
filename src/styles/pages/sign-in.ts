import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  display: 'grid',

  padding: '0 1rem 1rem',
  maxWidth: '600px',
  margin: '2rem auto',
})

export const Grid = styled('div', {
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: '1fr 230px',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})
