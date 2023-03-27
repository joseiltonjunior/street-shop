import { Reducer } from 'redux'
import { productProps } from './action'

const INITIAL_STATE: productProps[] = []

const product: Reducer<productProps[]> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@products/SET_PRODUCTS': {
      const { products } = action.payload

      return (state = products)
    }

    default: {
      return state
    }
  }
}

export default product
