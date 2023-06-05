import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  padding: '0 1rem 1rem',
  maxWidth: '1080px',
  margin: '2rem auto',
})

export const Content = styled('div', {
  display: 'grid',
  gridTemplateColumns: '250px auto',
  border: '1px solid $gray500',
  borderRadius: 8,
  overflow: 'hidden',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },

  aside: {
    background: '$gray500',
  },

  figure: {
    background: '$gray800',
    width: '100px',
    height: '100px',
    borderRadius: '50px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  article: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',

    strong: {
      color: '$orange500',
      marginTop: '1rem',
    },

    span: {
      color: '$gray300',
    },
  },

  nav: {
    borderTop: '1px solid $gray800',

    flexDirection: 'column',
    display: 'flex',

    button: {
      background: 'transparent',
      border: 'none',
      color: '$gray100',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '1rem',
      padding: '1rem',
      '&:hover': {
        background: '$orange500',
        color: '$gray800',
      },
    },

    'button + button': {
      borderTop: '1px solid $gray800',
    },
  },
})

export const Main = styled('main', {
  background: '$gray800',
  padding: '2rem',
})
