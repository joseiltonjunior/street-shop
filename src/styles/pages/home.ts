import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  // background: '$gray800',
  padding: '1rem',
  height: '100vh',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

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

  padding: '0 1rem 1rem',
  '@media (max-width: 900px)': {
    display: 'block',
  },
})

export const ContentProducts = styled('div', {
  // background: 'red',
  // width: '100%',
  // margin: '0 auto',
  // alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  justifyItems: 'center',
  gap: '2rem',
})
