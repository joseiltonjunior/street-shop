import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  padding: '0 1rem 1rem',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '1rem auto',

  strong: {
    fontSize: '$xl',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '800px',
  },

  '@media (max-width: 900px)': {
    alignItems: 'initial',
    form: {
      div: {
        display: 'flex !important',
        flexDirection: 'column',
        gridTemplateColumns: '1fr',
      },
    },
  },
})
