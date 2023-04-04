import { styled } from '@/styles'

export const Container = styled('div', {
  width: '6rem',
  position: 'relative',
})

export const DropdownSelection = styled('button', {
  backgroundColor: 'transparent',

  width: '100%',
  cursor: 'pointer',
  border: 'none',

  '::before': {
    content: '',
    position: 'absolute',
    width: '6px',
    height: '6px',
    border: ' 2px solid $gray900',
    right: 0,
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
})

export const DropdownItemName = styled('div', {
  padding: '0.2rem 0.5rem',

  fontSize: '$md',

  variants: {
    isSelected: {
      true: {
        background: '$gray900',
        color: '$white',
        fontWeight: 600,
      },
    },
  },
})

export const DropdownContainer = styled('div', {
  position: 'absolute',
  backgroundColor: '$orange500',
  borderBottom: '1px solid $gray800',
  borderRight: '1px solid $gray800',
  borderLeft: '1px solid $gray800',
  overflow: 'hidden',

  width: '10rem',

  borderRadius: '0 0 6px 6px',
  top: 27,
  right: -5,

  zIndex: '1000',
})
