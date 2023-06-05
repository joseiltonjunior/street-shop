import Link from 'next/link'
import { styled } from '..'

export const Container = styled('div', {
  width: '100%',
  display: 'grid',

  padding: '0 1rem 1rem',
  maxWidth: '600px',
  margin: '2rem auto',
})

export const UserAlreadyExists = styled(Link, {
  color: '$orange500',
  fontWeight: 'bold',
  fontSize: '$md',
  textDecoration: 'none',
  marginTop: '1rem',
  textAlign: 'center',

  transition: 'all 0.2s',

  '&:hover': {
    textDecoration: 'underline',
  },
})
