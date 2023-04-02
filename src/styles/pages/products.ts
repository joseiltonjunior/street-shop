import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  padding: '0 1rem 1rem',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '0 auto',

  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '2rem',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})
