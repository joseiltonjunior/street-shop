export interface productProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
  quantity: number
}

export function addProduct(product: productProps) {
  return {
    type: '@cart/ADD_PRODUCT',
    payload: {
      product,
    },
  }
}

export function removeProduct(product: productProps) {
  return {
    type: '@cart/REMOVE_PRODUCT',
    payload: {
      product,
    },
  }
}

export function addQuantity(product: productProps) {
  return {
    type: '@cart/ADD_QUANTITY',
    payload: {
      product,
    },
  }
}

export function changeQuantity(product: productProps) {
  return {
    type: '@cart/CHANGE_QUANTITY',
    payload: {
      product,
    },
  }
}
