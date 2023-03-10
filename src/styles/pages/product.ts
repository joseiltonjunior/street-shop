import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  height: 'calc(100vh - 7.25rem)',

  background: 'red',
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
  // height: '100vh',

  '@media (max-width: 900px)': {
    display: 'block',
  },
})
