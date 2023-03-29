import { styled } from '..'

export const Container = styled('div', {
  width: '100%',

  padding: '0 1rem 1rem',
  // height: '100vh',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  // background: 'red',
  margin: '0 auto',

  h3: {
    fontSize: '$xl',
    margin: '1rem 0',
  },
})

export const ContentWeb = styled('div', {
  display: 'block',

  '@media (max-width: 900px)': {
    display: 'none',
  },
})

export const ContentMobile = styled('div', {
  display: 'none',

  '@media (max-width: 900px)': {
    display: 'block',
  },
})
