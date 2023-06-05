import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3rem',

  padding: '0 1rem 1rem',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '1rem auto',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})

export const Title = styled('strong', {
  fontSize: '$lg',
  color: '$orange500',

  variants: {
    isTopMargin: {
      true: {
        marginTop: '2rem',
      },
    },
  },
})

export const Box = styled('div', {
  flexDirection: 'column',
  display: 'flex',
  maxWidth: 400,
  padding: '1rem',
  borderRadius: 8,
  gap: '0.5rem',

  variants: {
    danger: {
      true: {
        background: '$red500',
        color: '$white',
      },
    },
    total: {
      true: {
        background: '$gray100',
        color: '$gray800',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
  },
})

export const ContentForm = styled('div', {
  gap: 20,

  button: {
    marginTop: '4rem',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '800px',
  },

  '@media (max-width: 900px)': {
    button: {
      display: 'none',
    },
    form: {
      div: {
        display: 'flex !important',
        flexDirection: 'column',
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const ContentCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '2rem',
  marginTop: '2rem',

  button: {
    maxWidth: 400,

    display: 'none',
  },

  '.rccs': {
    width: '100%',
    height: '100%',
  },

  '.rccs__card': {
    margin: 0,

    width: '100%',
    maxWidth: '400px',
    height: '250px',
  },

  '@media (max-width: 900px)': {
    marginTop: 0,

    '.rccs__card': {
      height: '200px',
    },

    button: {
      display: 'flex',
    },
  },
})
