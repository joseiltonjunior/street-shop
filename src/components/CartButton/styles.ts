import { styled } from '@/styles'
import Link from 'next/link'

export const Container = styled(Link, {
  color: '$orange500',
  textDecoration: 'none',
  cursor: 'pointer',

  position: 'absolute',
  right: 20,
})
