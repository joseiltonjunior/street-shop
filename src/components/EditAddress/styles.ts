import { styled } from '@stitches/react'

export const ButtonEdit = styled('button', {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',

  svg: {
    fill: '$orange500',
  },
})

export const FormGrid = styled('div', {
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: '130px 1fr 100px 150px',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})
