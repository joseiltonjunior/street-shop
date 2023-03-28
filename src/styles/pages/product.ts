import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  // marginTop: '1rem',

  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

  margin: '0 auto',
})

export const ContentWeb = styled('div', {
  display: 'block',

  '@media (max-width: 900px)': {
    display: 'none',
  },
})

export const ContentMobile = styled('div', {
  display: 'none',
  padding: '0 1rem 1rem',

  '@media (max-width: 900px)': {
    display: 'block',
  },
})
