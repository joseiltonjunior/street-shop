import { styled } from '@stitches/react'

export const Container = styled('button', {
  marginTop: 'auto',
  background: '$purple300',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',
  height: '3.813rem',
  transition: 'background 0.3s',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '&:hover': {
    background: '$purple300',
  },
})
