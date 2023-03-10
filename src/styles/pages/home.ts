import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
})

export const ContentWeb = styled('div', {
  display: 'block',

  '@media (max-width: 900px)': {
    display: 'none',
  },
})

export const ContentMobile = styled('div', {
  display: 'none',

  padding: '1rem',
  height: 'calc(100vh - 10rem)',

  '@media (max-width: 900px)': {
    display: 'block',
  },
})
