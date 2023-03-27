import { styled } from '@/styles'
import Link from 'next/link'

export const Container = styled('main', {
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',

  height: 600,

  display: 'grid',
  gridTemplateColumns: '1fr 0.7fr',
  alignItems: 'flex-start',

  '@media (max-height: 700px)': {
    maxHeight: 465,
  },

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
    height: 'calc(100vh - 102px)',
  },
})

export const Product = styled(Link, {
  display: 'grid',
  gridTemplateColumns: '150px auto 150px',
  textDecoration: 'none',
  color: '$gray100',
  padding: '0 1rem',
  alignItems: 'center',

  '.price': {
    strong: {
      color: '$orange500',
      marginLeft: '1rem',
    },
  },

  button: {
    background: 'transparent',
    color: '$orange500',
    fontWeight: 'bold',

    border: 'none',
    fontSize: '$sm',

    cursor: 'pointer',

    '&:hover': {
      color: '$white',
    },

    span: {
      display: 'none',
    },
  },

  'div.info': {
    button: {
      display: 'none',
    },
  },

  '@media (max-width: 900px)': {
    gridTemplateColumns: '120px auto',

    'div.info': {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',

      button: {
        display: 'block',
        marginTop: '1rem',
      },
    },

    img: {
      width: '100%',
      heigth: '100%',
      objectFit: 'cover',
    },

    'button.button-web': {
      display: 'none',
    },
  },
})

export const TotalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  marginTop: 'auto',
  gap: '2rem',

  padding: '1rem',

  background: '$gray800',
  borderBottomLeftRadius: 8,
  borderTopLeftRadius: 8,
  width: '100%',

  div: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',

    strong: {
      fontSize: '$md',
    },
  },

  p: {
    fontSize: '$lg',
    fontWeight: 'bold',
  },

  '@media (max-width: 900px)': {
    borderRadius: 0,
    height: 'auto',
  },
})

export const ProductsContent = styled('div', {
  '&::-webkit-scrollbar': {
    width: '3px',
  },

  '&::-webkit-scrollbar-track': {
    background: '$gray900',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$orange500',
  },

  'a+a': {
    borderTop: '1px solid $orange500',
  },

  '@media (min-width: 900px)': {
    overflowY: 'scroll',
    height: '100%',
  },
})

export const EmptyCartContent = styled('div', {
  width: '100%',

  height: 600,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  flexDirection: 'column',

  '@media (max-height: 700px)': {
    height: 450,
  },

  img: {
    objectFit: 'contain',
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
