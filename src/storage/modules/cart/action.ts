import { ProductInfoProps } from '@/types/product'

export function addProduct(product: ProductInfoProps) {
  return {
    type: '@cart/ADD_PRODUCT',
    payload: {
      product,
    },
  }
}

export function removeProduct(product: ProductInfoProps) {
  return {
    type: '@cart/REMOVE_PRODUCT',
    payload: {
      product,
    },
  }
}

export function addQuantity(product: ProductInfoProps) {
  return {
    type: '@cart/ADD_QUANTITY',
    payload: {
      product,
    },
  }
}

export function changeQuantity(product: ProductInfoProps) {
  return {
    type: '@cart/CHANGE_QUANTITY',
    payload: {
      product,
    },
  }
}

export function clearCart() {
  return {
    type: '@cart/CLEAR_CART',
  }
}
