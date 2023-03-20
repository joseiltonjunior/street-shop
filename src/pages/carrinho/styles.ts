import { styled } from '@/styles'

export const Container = styled('main', {
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  height: '100%',
  minHeight: 656,

  display: 'grid',
  gridTemplateColumns: '1fr 25rem',
  alignItems: 'flex-start',

  borderTop: '1px solid $orange500',
  borderBottom: '1px solid $orange500',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
    borderBottom: 'none',
  },
})

export const Product = styled('div', {
  '.contentWeb': {
    display: 'grid',
    gridTemplateColumns: '1fr 10rem 10rem 10rem',
    padding: '0.5rem 1rem',
  },

  '.contentMobile': {
    display: 'none',
    width: '100%',
    gap: '1rem',
    padding: '0.5rem 1rem',

    '.contentInfo': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',

      width: '100%',

      div: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
  },

  '@media (max-width: 900px)': {
    display: 'flex',

    '.contentWeb': {
      display: 'none',
    },

    '.contentMobile': {
      display: 'grid',

      gridTemplateColumns: 'auto 1fr auto',
    },
  },

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
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  height: '100%',
  background: '$gray800',

  div: {
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
    borderTop: '1px solid $orange500',
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
    background: '$orange500',
    color: '$gray900',
    textDecoration: 'none',
    padding: '1rem',
    borderRadius: 8,

    fontWeight: 'bold',
    transition: 'all 0.2s',
    marginTop: '4rem',

    '&:hover': {
      color: '$white',
    },
  },

  strong: {
    marginTop: '1rem',
  },
})
