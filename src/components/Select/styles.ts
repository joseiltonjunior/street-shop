import { styled } from '@/styles'

export const Container = styled('div', {
  width: '150px',
})

export const DropdownSelection = styled('button', {
  backgroundColor: 'transparent',
  height: 'auto',
  borderRadius: '8px',
  width: '100%',
  cursor: 'pointer',
  border: 'none',
  boxShadow: 'none',
  position: 'relative',

  '::before': {
    content: '',
    position: 'absolute',
    width: '6px',
    height: '6px',
    border: ' 2px solid $gray900',
    right: '0',
    top: '20%',
    borderTop: '1px solid transparent',
    borderRight: '1px solid transparent',
    transform: 'rotate(-45deg)',
    transition: 'all 0.2s',
  },

  variants: {
    isOpen: {
      true: {
        transition: 'all 0.2s',

        '::before': {
          top: '50%',
          transform: 'rotate(-225deg)',
        },
      },
    },
  },
})

export const SelectedItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const SelectedItemName = styled('span', {
  fontWeight: '600',
  fontSize: '1rem',
  color: '$gray900',
})

export const DropdownItem = styled('div', {
  cursor: 'pointer',
  fontWeight: '400',
  fontSize: '16px',
  margiBottom: '0.5rem',
  color: '$gray800',

  '&:hover > div': {
    fontWeight: '600',
  },
})

export const DropdownItemName = styled('div', {
  padding: '0.2rem 0.5rem',

  variants: {
    isSelected: {
      true: {
        background: '$gray900',
        color: '$white',
        borderRadius: '6px',
        width: 'fit-content',
        fontWeight: 600,
      },
    },
  },
})

export const DropdownContainer = styled('div', {
  position: 'absolute',
  backgroundColor: '$orange500',
  border: '1px solid $gray900',

  borderRadius: '8px',
  marginTop: '1rem',
  left: 0,

  padding: '0.6rem',
  width: '100%',
  zIndex: '1000',
})

export const DropdownItensContainer = styled('div', {
  overflow: 'auto',
})
