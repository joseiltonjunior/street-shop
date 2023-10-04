import { Reducer } from 'redux'
import { FILTER_CATEGORY_PRODUCTS, FilterCategoryProps } from './types'

const INITIAL_STATE: FilterCategoryProps = { filter: 'all' }

const filterCategoryProducts: Reducer<FilterCategoryProps> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case FILTER_CATEGORY_PRODUCTS: {
      const { filter } = action.payload

      return (state = filter)
    }

    default: {
      return state
    }
  }
}

export default filterCategoryProducts
