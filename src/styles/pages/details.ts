import { styled } from '@/styles'

export const Container = styled('main', {
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '2rem auto',

  h1: {
    color: '$orange500',
    fontSize: '$xl',
  },

  '.content': {
    background: '$gray800',
    marginTop: '0.5rem',
    overflow: 'hidden',

    borderRadius: 6,

    display: 'grid',
    gridTemplateColumns: '696px 496px',

    justifyContent: 'center',

    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },

  '@media (max-width: 900px)': {
    margin: '1rem',
  },
})

export const TitltePage = styled('div', {
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  width: '100%',
  margin: '2rem auto',
  background: 'red',
})

export const Product = styled('div', {
  display: 'grid',
  gridTemplateColumns: '100px auto',

  color: '$gray100',
  alignItems: 'center',

  paddingRight: '1rem',
})

export const ProductInfoContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
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
  padding: '1rem',

  background: '$orange500',

  button: {
    width: '100%',
    background: '$gray800',
    color: '$gray100',
  },

  '.bottomContent': {
    marginTop: '2rem',
  },

  strong: {
    color: '$gray800',
  },

  span: {
    color: '$gray900',
    overflow: 'hidden',

    textAlign: 'right',

    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
  },

  p: {
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$gray800',
    margin: '1rem 0',
  },

  '@media (max-width: 900px)': {
    borderRadius: 0,
    height: 'auto',
    marginTop: 'auto',

    button: {
      marginTop: '2rem',
    },

    p: {
      fontSize: '$md',
    },
  },
})

export const ProductsContent = styled('div', {
  'div+div': {
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
