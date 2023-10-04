import { FILTER_CATEGORY_PRODUCTS, FilterCategoryProps } from './types'

export function filterCategoryProducts(filter: FilterCategoryProps) {
  return {
    type: FILTER_CATEGORY_PRODUCTS,
    payload: {
      filter,
    },
  }
}
