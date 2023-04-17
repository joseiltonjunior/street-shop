import { styled } from '@/styles'
import Link from 'next/link'

export const Container = styled('main', {
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '0 auto',
  gap: '1rem',

  display: 'grid',
  gridTemplateColumns: '1fr 0.7fr',

  height: 'calc(100vh - 152px)',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
    // gridTemplateRows: '100% auto',
    height: 'calc(100vh - 132px)',
  },
})

export const Product = styled(Link, {
  display: 'grid',
  gridTemplateColumns: '100px auto',
  textDecoration: 'none',
  color: '$gray100',

  alignItems: 'center',

  '@media (max-width: 900px)': {
    paddingRight: '1rem',
  },
})

export const ButtonRemoveProduct = styled('button', {
  background: 'transparent',
  color: '$orange500',
  fontWeight: 'bold',

  border: 'none',
  fontSize: '$sm',

  cursor: 'pointer',

  '&:hover': {
    color: '$white',
  },
})

export const ProductInfoContent = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
})

export const ButtonQuantity = styled('button', {
  background: 'transparent',
  width: '20px',
  height: '20px',
  cursor: 'pointer',
  border: 'none',

  variants: {
    increment: {
      true: {
        transform: 'rotate(180deg)',
        bottom: 15,
      },
    },
  },
})

export const QuantityContent = styled('div', {
  display: 'flex',
})

export const NameProduct = styled('strong', {
  overflow: 'hidden',

  display: '-webkit-box',
  '-webkit-line-clamp': '1',
  '-webkit-box-orient': 'vertical',
})

export const TotalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  gap: '2rem',
  padding: '1rem',

  height: '20rem',

  background: '$gray800',
  borderRadius: 8,
  width: '100%',

  'div.alert': {
    // display: 'flex',

    strong: {
      fontSize: '$md',
      color: '$orange500',
    },
  },

  'div.value': {
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
    marginTop: 'auto',
  },
})

export const ProductsContent = styled('div', {
  'a+a': {
    borderTop: '1px solid $orange500',
  },
})

export const RowContent = styled('div', {
  display: 'flex',

  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',

  gap: '1rem',
})

export const EmptyCartContent = styled('div', {
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  height: '500px',

  flexDirection: 'column',

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
