import { styled } from '@/styles'

export const Container = styled('main', {
  background: '$gray100',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  height: '48px',
  width: '100%',

  borderRadius: 8,
  border: '2.5px solid $gray100',

  overflow: 'hidden',

  svg: {
    fill: '$gray100',
  },

  button: {
    border: 'none',
    background: 'transparent',
    marginRight: '1rem',
    width: '1.875rem',
    height: '1.875rem',
    svg: {
      fill: '$gray500',
      width: '1.25rem',
      height: '1.25rem',
    },
  },

  input: {
    border: 'none',
    background: 'transparent',
    height: '100%',
    width: '100%',
    outline: 'none',
    color: '$gray800',
    fontSize: '0.9rem',
    padding: '0 1rem',
  },

  variants: {
    isCheck: {
      true: {
        borderColor: '$green500',
        svg: {
          fill: '$green500',
        },
      },
    },
    isFocused: {
      true: {
        borderColor: '$orange500',
        svg: {
          fill: '$orange500',
        },
      },
    },
    isError: {
      true: {
        borderColor: '$red500',
        svg: {
          fill: '$red500',
        },
      },
    },

    isDisabled: {
      true: {
        background: '$gray500',
        borderColor: '$gray800',

        input: {
          color: '$gray300',
        },

        svg: {
          fill: '$gray800',
        },
      },
    },
  },
})
