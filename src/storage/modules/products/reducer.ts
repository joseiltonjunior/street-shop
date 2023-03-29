import { ProductInfoProps } from '@/types/product'
import { Reducer } from 'redux'

const INITIAL_STATE: ProductInfoProps[] = []

const product: Reducer<ProductInfoProps[]> = (
  state = INITIAL_STATE,
  action,
) => {
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
