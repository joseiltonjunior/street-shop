import { Reducer } from 'redux'

const INITIAL_STATE = ''

const filterProducts: Reducer<string> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@products/FILTER_PRODUCTS': {
      const { filter } = action.payload

      return (state = filter)
    }

    default: {
      return state
    }
  }
}

export default filterProducts
