import { styled } from '@/styles'

export const Container = styled('main', {
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,

  display: 'grid',
  gridTemplateColumns: '1fr 25rem',
  alignItems: 'flex-start',

  borderTop: '1px solid $purple300',
  borderBottom: '1px solid $purple300',
})

export const Product = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 10rem 10rem 10rem',
  alignItems: 'center',
  padding: '1rem',
  div: {
    alignItems: 'center',
    display: 'flex',
  },

  span: {
    textAlign: 'center',
  },

  strong: {
    textAlign: 'center',
  },

  button: {
    background: 'transparent',
    color: '$gray100',
    fontWeight: 'bold',

    border: 'none',
    fontSize: '$sm',

    cursor: 'pointer',

    '&:hover': {
      color: '$gray300',
    },
  },
})

export const TotalContent = styled('div', {
  //   textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  height: '100%',
  background: '$gray800',

  div: {
    with: '100%',
    // background: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    strong: {
      fontSize: '$md',
    },

    marginTop: '2rem',
  },

  p: {
    fontSize: '$lg',
    fontWeight: 'bold',
  },

  button: {
    marginTop: 'auto',
  },
})

export const ProductsContent = styled('div', {
  'div+div': {
    borderTop: '1px solid $purple300',
  },
})

export const EmptyCartContent = styled('div', {
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
  height: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  flexDirection: 'column',

  img: {
    objectFit: 'cover',
  },

  a: {
    background: '$purple300',
    color: '$gray100',
    textDecoration: 'none',
    padding: '1rem',
    borderRadius: 8,

    fontWeight: 'bold',
    transition: 'all 0.2s',
    marginTop: '4rem',

    '&:hover': {
      background: '$purple500',
    },
  },

  strong: {
    marginTop: '1rem',
  },
})
