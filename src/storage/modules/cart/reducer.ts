import { Reducer } from 'redux'
import { productProps } from './action'

const INITIAL_STATE: productProps[] = []

const product: Reducer<productProps[]> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@cart/ADD_PRODUCT': {
      const { product } = action.payload

      return (state = [...state, product])
    }
    default: {
      return state
    }
  }
}

export default product
