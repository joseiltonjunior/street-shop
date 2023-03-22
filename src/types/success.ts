export interface SuccessProps {
  salesInformation: {
    clientName: string
    products: {
      product: {
        name: string
        images: string[]
      }
      quantity: number
    }[]
  }
}
