import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',

  '@media (max-width: 900px)': {
    justifyContent: 'flex-start',
  },
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  '@media (max-width: 900px)': {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 0',
  },
})
