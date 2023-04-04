export interface SuccessProps {
  salesInformation: {
    id: string
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
