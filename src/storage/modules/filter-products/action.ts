export function filterProducts(filter: string) {
  return {
    type: '@products/FILTER_PRODUCTS',
    payload: {
      filter,
    },
  }
}
