import { ProductInfoProps } from '@/types/product'

export function setProducts(products: ProductInfoProps[]) {
  return {
    type: '@products/SET_PRODUCTS',
    payload: {
      products,
    },
  }
}
