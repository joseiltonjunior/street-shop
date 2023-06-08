import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$white',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body::-webkit-scrollbar': {
    width: '0.4rem',
  },
  'body::-webkit-scrollbar-thumb': {
    background: '$gray500',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
})
