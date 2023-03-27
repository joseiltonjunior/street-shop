export interface productProps {
  id: string
  name: string
  imageUrl: string
}

export function setProducts(products: productProps[]) {
  return {
    type: '@products/SET_PRODUCTS',
    payload: {
      products,
    },
  }
}
