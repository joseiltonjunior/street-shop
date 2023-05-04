import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3rem',

  padding: '0 1rem 1rem',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '1rem auto',

  '.card': {
    '.rccs': {
      width: '100%',
      height: '100%',
    },

    '.rccs__card': {
      margin: 0,
      marginTop: '2rem',
      width: '400px',
      height: '250px',
    },
  },

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
