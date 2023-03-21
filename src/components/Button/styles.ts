import { styled } from '@stitches/react'

export const Container = styled('button', {
  marginTop: 'auto',
  background: '$orange500',
  border: 0,
  color: '$gray900',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',
  height: '3.813rem',
  transition: 'all 0.3s',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '&:hover': {
    color: '$white',
  },
})
